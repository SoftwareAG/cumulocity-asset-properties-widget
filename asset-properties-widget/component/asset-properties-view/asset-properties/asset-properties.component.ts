import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  IManagedObject,
  IManagedObjectBinary,
  InventoryBinaryService,
  InventoryService,
} from '@c8y/client';
import {
  AlertService,
  AssetTypesService,
  DashboardChildComponent,
  DatePipe,
  gettext,
} from '@c8y/ngx-components';
import { AssetPropertiesItem } from './asset-properties.model';
import { JSONSchema7 } from 'json-schema';
import { Permissions } from '@c8y/ngx-components';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AssetLocationComponent } from '@c8y/ngx-components/sub-assets';
import { RESULT_TYPES } from '../../../common/asset-property-constant';

@Component({
  selector: 'c8y-asset-properties',
  templateUrl: './asset-properties.component.html',
})
export class AssetPropertiesComponent implements OnChanges, OnInit {
  @Input() computedPropertyObject: IManagedObject;
  @Input() asset: IManagedObject;
  @Output() assetChange = new EventEmitter<IManagedObject>();
  @Input()
  properties: IManagedObject[] = [];
  assetType: IManagedObject;
  customProperties: AssetPropertiesItem[] = [];
  isEdit = false;
  isLoading = false;
  isEditDisabled: boolean = false;
  private destroy$ = new Subject();
  @ViewChild(AssetLocationComponent)
  clusterMap: AssetLocationComponent;
  component: { changeEnd: any; };

  constructor(
    private assetTypes: AssetTypesService,
    private inventory: InventoryService,
    private inventoryBinary: InventoryBinaryService,
    private alert: AlertService,
    private permissionsService: Permissions,
    public dashboardChild: DashboardChildComponent,
    private datePipe: DatePipe
  ) {}

  async ngOnInit() {
    this.isEditDisabled = !(await this.permissionsService.canEdit([], this.asset, {
      skipOwnerCheck: true,
      skipRolesCheck: true
    }));
    this.listenToWidgetResizeEvent(this.dashboardChild);
  }

 async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.asset?.currentValue || changes.properties?.currentValue || changes.computedPropertyObject?.currentValue) {
      this.assetType = undefined;
      this.customProperties = [];
      this.loadAsset();
    }
  }

  async loadAsset() {
    this.isLoading = true;
    this.assetType = this.assetTypes.getAssetTypeByName(this.asset.type);
    this.customProperties = await this.resolveCustomProperties(this.properties);
    this.isLoading = false;
  }

  async resolveCustomProperties(managedObjects: IManagedObject[]) {
    const properties = [];
    for (const mo of managedObjects) {
      if (mo.c8y_JsonSchema && mo.active) {
        const [item] = await this.parseItem(mo, mo.c8y_JsonSchema.properties, this.asset);
        this.setItemRequired(item, mo);
        properties.push(item);
      }
    }
    return properties;
  }

  deleteTitleFromMOJsonSchema(mo: IManagedObject) {
    const schemaProperties = mo?.c8y_JsonSchema?.properties;
    const [property] = Object.keys(schemaProperties || {});
    delete (mo?.c8y_JsonSchema?.properties[property] || {}).title;
  }

  async parseItem(
    mo: IManagedObject,
    properties,
    asset
  ): Promise<AssetPropertiesItem[]> {
    if (!asset) {
      return [];
    }
    const keys = Object.keys(properties);
    const items: AssetPropertiesItem[] = [];
    for (const key of keys) {
      if (properties[key]) {
        let value = asset[key];
        if(mo.computed){
          value = this.getComputedPropertyValue(mo,asset);
        }
        const {type} = properties[key];
        const {title} = properties[key];
        let file;
        if (type === 'file' && value) {
          const fileId = typeof value === 'object' ? value[0]?.file?.id : value;
          const fileData = await this.getFileManagedObject(fileId);
          file = fileData;
          value = [fileData];
        } else if (type === 'date') {
          const valueDate = new Date(value);
          value = !isNaN(valueDate.getTime()) ? valueDate : null;
        }
        if (type === 'object') {
          // remove title to avoid excessive property name on asset complex properties form
          this.deleteTitleFromMOJsonSchema(mo);

          if (!value) {
            value = {};
            for (const prop in properties[key].properties) {
              value[prop] = undefined;
            }
          }
        }
        items.push({
          key,
          value,
          label: title || mo.label,
          type,
          description: mo.description,
          file,
          complex:
            type === 'object'
              ? await this.parseItem(mo, properties[key].properties, value)
              : undefined,
          isEdit: false,
          jsonSchema: mo.c8y_JsonSchema,
            lastUpdated: mo.lastUpdated,
            isEditable: mo.isEditable,
            active: properties[key].active as boolean,
        });
      }
    }
    return items;
  }

  toggleEdit(prop: AssetPropertiesItem) {
    prop.isEdit = !prop.isEdit;
  }

  async getFileManagedObject(id: string) {
    try {
      const { data } = await this.inventory.detail(id);
      return data;
    } catch (ex) {
      this.alert.addServerFailure(ex);
    }
  }

  async save(propertyValue, prop: AssetPropertiesItem): Promise<void> {
    try {
      if (prop.type === 'object') {
        propertyValue[prop.key] = await this.uploadFiles(propertyValue[prop.key], prop.value);
      } else {
        for (const [key, value] of Object.entries(propertyValue)) {
          if (value === undefined) {
            propertyValue[key] = null;
          }
        }
        // eslint-disable-next-line no-param-reassign
        propertyValue = await this.uploadFiles(propertyValue, prop.value);
      }

      // Avoid making a PUT request containing just the id, as response body might be incomplete
      const hasValues = Object.values(propertyValue).some(value => value !== undefined);
      if (!hasValues) {
        this.toggleEdit(prop);
        return;
      }
      const updatedAsset = { id: this.asset.id, ...propertyValue };
      const { data } = await this.inventory.update(updatedAsset);
      this.toggleEdit(prop);
      this.asset = data;
      this.assetChange.emit(this.asset);
      await this.loadAsset();
      this.alert.success(gettext('Asset properties updated.'));
    } catch (ex) {
      this.alert.addServerFailure(ex);
      this.toggleEdit(prop);
    }
  }

  private async uploadFiles(model: object, moId?: IManagedObjectBinary[]): Promise<object> {
    const keys = Object.keys(model);
    for (const key of keys) {
      if (Array.isArray(model[key]) && model[key][0]?.file instanceof File) {
        try {
          const upload = await this.inventoryBinary.create(model[key][0].file);
          try {
            if (moId && moId[0]) {
              await this.inventory.childAdditionsRemove(moId[0], this.asset.id);
            }
          } catch (ex) {
            this.alert.addServerFailure(ex);
          }
          model[key] = upload.data.id;
          await this.inventory.childAdditionsAdd(upload.data.id, this.asset.id);
        } catch (ex) {
          this.alert.addServerFailure(ex);
        }
      }
    }
    return model;
  }

  private setItemRequired(item: AssetPropertiesItem, mo: IManagedObject): void {
    const isAssetPropertyRequired = !!this.assetType?.c8y_IsAssetType?.properties.find(
      p => p.id === mo.id
    )?.isRequired;
    if (!isAssetPropertyRequired) {
      return;
    }
    const isComplexProperty = !!item?.complex?.length;
    if (isComplexProperty) {
      const complexProperty = item.jsonSchema?.properties?.[mo.name] as JSONSchema7;
      complexProperty.required = item.complex.map(({ key }) => key);
    } else {
      item.jsonSchema.required = [mo.name];
    }
  }

  private async listenToWidgetResizeEvent(dashboardChild: DashboardChildComponent) {
    dashboardChild.changeEnd
      .pipe(
        filter(child => child.lastChange === 'resize'),
        takeUntil(this.destroy$)
      )
      .subscribe(async () => {
        this.clusterMap.mapView.map.invalidateSize();
      });
  }

  getComputedPropertyValue(mo,asset){
    let value = '';

    switch (mo.name) {
      case 'alarmCountToday':
      case 'alarmCount3Months':
      case 'eventCountToday':
      case 'eventCount3Months':
        value = this.computedPropertyObject? this.computedPropertyObject[`${mo.name}_${mo.config.id}`] : 0;
        break;
      case 'lastDeviceMessage':
        value = asset.childDevices.references.length;
        break;
      case 'lastMeasurement':
        value = this.computedPropertyObject ? this.getLastMeasurementWithFormat(this.computedPropertyObject[`${mo.name}_${mo.config.id}`],mo.config.resultTypes) : undefined;
        break;
      case 'childDevicesCount':
        value = asset.childDevices.references.length;
        break;
      case 'childAssetsCount':
        value = asset.childAssets.references.length;
        break;
      case 'configurationSnapshot':
        value = asset.childDevices.references.length;
        break;
      default:
        value = '';
        break;
    }
    return value;
  }

  getLastMeasurementWithFormat ( measurementObj ,resultType) {
    let out = '';
    if(measurementObj){
      const { date,value, unit } = measurementObj;
      const type = resultType || RESULT_TYPES.VALUE.value;
      switch (type) {
        case RESULT_TYPES.VALUE.value:
          out = value;
          break;
        case RESULT_TYPES.VALUE_UNIT.value:
          out = `${value } ${ unit || ''}`;
          break;
        case RESULT_TYPES.VALUE_UNIT_TIME.value:
          out = ` ${this.datePipe.transform(date, 'short')} | ${`${value } ${ unit || ''}`}`;
          break;
        default:
         out = '';
          break;
      }
    }
    return out;
  }
}
