import { Component, Input, OnChanges } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import { AssetTypesService, gettext } from '@c8y/ngx-components';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { isEmpty, cloneDeep } from 'lodash-es';
import { ContextDashboardService } from '@c8y/ngx-components/context-dashboard';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { assetPropertyItemSelectorCtrlComponent } from '../asset-property-item-selector/asset-property-item-selector.component';
import { AssetPropertiesService } from '../asset-properties.service';
import {
  defaultProperty,
  property,
} from '../../../common/asset-property-constant';
import { some } from 'lodash-es';
import { ComputedPropertyConfigComponent } from '../computed-asset-property/computed-property-config.component';

type ModalInitialState = {
  title: string;
  customProperties: any;
  propertiesList: any;
};

@Component({
  selector: 'c8y-asset-property-selector',
  templateUrl: './asset-property-selector.component.html',
})
export class AssetPropertiesSelectorComponent implements OnChanges {
  @Input() config: IManagedObject;
  @Input() asset: IManagedObject;
  isLoading: boolean = false;
  assetType: IManagedObject;
  assetPropertySelectorModalRef: BsModalRef;
  computedPropertyConfigModalRef: BsModalRef;
  properties = cloneDeep(defaultProperty);
  customProperties: IManagedObject[] = cloneDeep(defaultProperty).concat(
    cloneDeep(property)
  );
  ExpandedComplexProperty: any;
  isAtleastOnePropertySelected: boolean = true;
  selectedComputedPropertyIndex: number;

  constructor(
    private assetTypes: AssetTypesService,
    private assetPropertyService: AssetPropertiesService,
    private modalService: BsModalService,
    private contextDashboardService: ContextDashboardService
  ) {}

  async ngOnChanges(changes: IManagedObject): Promise<void> {
    if ((changes.asset.firstChange || !changes.asset.previousValue) && this.config?.properties) {
      this.properties = this.config.properties;
      this.customProperties = this.customProperties.concat(
        this.getConstructCustomProperties(
          await this.assetPropertyService.getCustomProperties(this.asset)
        )
      );
    } else if (changes.asset.currentValue) {
      this.assetType = undefined;
      this.loadAssetProperty();
    }
    this.isAtleastOnePropertySelected = true;
  }
  addDefaultAndSelectedProperties() {
    this.properties.forEach((property) => {
      const existingPropertyIndex = this.customProperties
        .map(function (item) {
          return item.name;
        })
        .indexOf(property.name);
      if (existingPropertyIndex > 0) {
        this.customProperties[existingPropertyIndex] = cloneDeep(property);
      } else {
        this.customProperties.push(cloneDeep(property));
      }
    });
  }
  getConstructCustomProperties(customProperties): IManagedObject[] {
    const simpleProperties: IManagedObject[] = [];
    const constructCustomProperties: IManagedObject[] = [];
    customProperties.forEach((property) => {
      const object =
        property.c8y_JsonSchema.properties[property.c8y_JsonSchema.key];
      if (object.type === 'object') {
        constructCustomProperties.push(property);
      } else {
        simpleProperties.push(property);
      }
    });
    return simpleProperties.concat(constructCustomProperties);
  }
  async loadAssetProperty() {
    this.isLoading = true;
    this.properties = cloneDeep(defaultProperty);
    this.assetType = this.assetTypes.getAssetTypeByName(this.asset.type);
    this.config.properties = this.properties;
    this.customProperties = cloneDeep(this.properties)
      .concat(property)
      .concat(
        this.getConstructCustomProperties(
          await this.assetPropertyService.getCustomProperties(this.asset)
        )
      );
    this.isLoading = false;
  }

  addProperty() {
    this.customProperties.forEach((property) => {
      property.active = false;
    });
    const assetPropertySelectorModalOptions: ModalOptions<ModalInitialState> = {
      class: 'modal-lg',
      backdrop: 'static',
      initialState: {
        title: gettext('Select property'),
        customProperties: this.customProperties,
        propertiesList: this.properties,
      },
    };
    this.assetPropertySelectorModalRef = this.modalService.show(
      assetPropertyItemSelectorCtrlComponent,
      assetPropertySelectorModalOptions
    );
    this.assetPropertySelectorModalRef.content.cancelPropertySelection.subscribe(
      (event: Event) => {
        this.assetPropertySelectorModalRef.hide();
      }
    );
    this.assetPropertySelectorModalRef.content.savePropertySelection.subscribe(
      (properties: IManagedObject[]) => {
        this.properties = this.properties.concat(
          this.removeSelectedProperties(properties)
        );
        this.isAtleastOnePropertySelected = true;
        this.config.properties = this.properties;
        this.properties.forEach((property, index) => {
          if(property.computed && property.config && !(property.config.dp?.length>0 || property.config.type)){
            this.config.properties[index].config = {...this.config.properties[index].config, ...{id:String(Math.random()).substr(2)}};
            this.configComputeProperty(index);
          }
        });
        this.assetPropertySelectorModalRef.hide();
      }
    );
  }
  constructCustomProperties(properties: IManagedObject[]) {
    this.properties.forEach((property) => {
      if (this.isComplexProperty(property)) {
        const customProperties =
          property.c8y_JsonSchema.properties[property.c8y_JsonSchema.key]
            ?.properties;
        const tempCustomProperties = {};
        for (const key in customProperties) {
          if (customProperties[key].active === true) {
            tempCustomProperties[key] = customProperties[key];
          }
          const complexPropertyValue = properties.find(
            (property) => property.name === customProperties[key].name
          );
          tempCustomProperties[key] = complexPropertyValue;
        }
        if (!isEmpty(tempCustomProperties)) {
          property.c8y_JsonSchema.properties[
            property.c8y_JsonSchema.key
          ].properties = tempCustomProperties;
        }
      }
    });
  }

  isComplexProperty(prop) {
    if (!prop.c8y_JsonSchema) {
      return false;
    }
    return (
      prop.c8y_JsonSchema.properties[prop.c8y_JsonSchema.key]?.type === 'object'
    );
  }

  removeSelectedProperties(properties) {
    properties.forEach((property, index) => {
      const removeIndex = this.properties
        .map(function (item) {
          return item.name || item.title;
        })
        .indexOf(property.name || property.title);
      if (removeIndex >= 0 && !property.config) {
        this.properties[removeIndex] = property;
        properties.splice(index, 1);
        this.removeSelectedProperties(properties);
      }
    });
    return properties;
  }

  updateOptions() {
    this.isAtleastOnePropertySelected = some(this.properties, 'active');
  }

  removeProperty(property: IManagedObject) {
    const removeIndex = this.properties
      .map(function (item) {
        return item.name || item.title;
      })
      .indexOf(property.name || property.title);
    if (removeIndex >= 0) {
      this.properties.splice(removeIndex, 1);
      property['active'] = false;
      this.isAtleastOnePropertySelected =
        this.properties.length > 0 && some(this.properties, 'active');
    }
  }

  onRowExpanded(property) {
    this.ExpandedComplexProperty = property;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.properties, event.previousIndex, event.currentIndex);
  }

  configComputeProperty(index){
    this.selectedComputedPropertyIndex = index;
    this.computedPropertyConfigModalRef = this.modalService.show(
      ComputedPropertyConfigComponent,
      {
        backdrop: 'static',
        initialState: {
          title: gettext('Computed property configuration'),
          property: this.properties[index],
          index: index
        },
      }
    );
    this.computedPropertyConfigModalRef.content.savePropertyConfiguration.subscribe(
      (object: any) => {
        this.config.properties[object.index] = object.property;
      }
    );
    this.computedPropertyConfigModalRef.content.cancelPropertyConfiguration.subscribe(
      (index: number) => {
        if(!(this.config.properties[index].config.dp?.length>0 || this.config.properties[index].config.type)){
         this.config.properties.splice(index, 1);
        }
      }
    );
  }
}
