import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  IManagedObject,
  IManagedObjectBinary,
  InventoryBinaryService,
  InventoryService,
  UserService
} from '@c8y/client';
import { AlertService, AppStateService, AssetTypesService, gettext } from '@c8y/ngx-components';
import { AssetPropertiesItem } from './asset-properties.model';
import { JSONSchema7 } from 'json-schema';
import { Permissions } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-asset-properties',
  templateUrl: './asset-properties.component.html'
})
export class AssetPropertiesComponent implements OnChanges {
  @Input()
  asset: IManagedObject;
  @Input()
  properties: IManagedObject[] = [];
  assetType: IManagedObject;
  customProperties: AssetPropertiesItem[] = [];
  isEdit = false;
  isLoading = false;
  isEditDisabled: boolean = false

  constructor(
    private assetTypes: AssetTypesService,
    private inventory: InventoryService,
    private inventoryBinary: InventoryBinaryService,
    private alert: AlertService,
    protected appState: AppStateService,
    protected user: UserService,
    private permissionsService: Permissions
  ) {}

 async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.asset?.currentValue || changes.properties?.currentValue) {
      this.assetType = undefined;
      this.customProperties = [];
      this.isEditDisabled = !(await this.permissionsService.canEdit([], this.asset, {
        skipOwnerCheck: true,
        skipRolesCheck: true
      }));
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
  getKey(properties){
    const arr = [];
    Object.keys(properties).forEach(function(item){
      if(properties[item].active) arr.push(item);
    }); 
    return arr;
  }

  deleteTitleFromMOJsonSchema(mo: IManagedObject) {
    const schemaProperties = mo?.c8y_JsonSchema?.properties;
    const property = Object.keys(schemaProperties || {})[0];
    delete (mo?.c8y_JsonSchema?.properties[property] || {}).title;
  }

  async parseItem(mo: IManagedObject, properties, asset): Promise<AssetPropertiesItem[]> {
    if (!asset) {
      return [];
    }
    const keys = Object.keys(properties);
    const items: AssetPropertiesItem[] = [];
    for (const key of keys) {
      if(properties[key]){
        let value = asset[key];
        const type = properties[key].type;
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
        if (value && type === 'boolean' && typeof value != 'boolean') {
          value = value ? value == 'true' : false;
          asset[key] = asset[key] ? asset[key] == 'true' : false;
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
        let assetKey = asset[key] ? asset[key] : '';
        items.push({
          key,
          value,
          label: asset.id ? mo.label : properties[key].title,
          type,
          description: mo.description,
          file,
          complex:
            type === 'object'
              ? await this.parseItem(mo, properties[key].properties, assetKey)
              : undefined,
          isEdit: false,
          jsonSchema: mo.c8y_JsonSchema,
          lastUpdated: mo.lastUpdated,
          isEditable: mo.isEditable,
          active: properties[key].active as boolean
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
      await this.loadAsset();
      this.alert.success(gettext('Properties changes saved.'));
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
            throw ex;
          }
          model[key] = upload.data.id;
          await this.inventory.childAdditionsAdd(upload.data.id, this.asset.id);
        } catch (ex) {
          throw ex;
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
      const complexProperty = item.jsonSchema?.properties?.[mo.c8y_JsonSchema.key] as JSONSchema7;
      complexProperty.required = item.complex.map(({ key }) => key);
    } else {
      item.jsonSchema.required = [mo.c8y_JsonSchema.key];
    }
  }
}
