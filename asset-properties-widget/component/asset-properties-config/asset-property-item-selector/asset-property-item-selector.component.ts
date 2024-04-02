import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import {
  computedPropertiesBaseObject,
  defaultProperty,
  devicePropertiesBaseObject
} from '../../../common/asset-property-constant';
import { some, cloneDeep, isEqual } from 'lodash-es';
import { AssetPropertiesService } from '../asset-properties.service';

@Component({
  selector: 'c8y-asset-property-item-selector-component',
  templateUrl: './asset-property-item-selector.component.html'
})
export class assetPropertyItemSelectorCtrlComponent implements OnInit {
  @Input() title?: string;
  @Input() deviceMO: IManagedObject;

  @Output() savePropertySelection = new EventEmitter<object>();
  @Output() cancelPropertySelection = new EventEmitter<void>();

  selectedProperty: IManagedObject[] = [];
  search: string = '';
  properties: any;

  constructor(private assetPropertyService: AssetPropertiesService) {}

  async ngOnInit(): Promise<void> {
    if (this.deviceMO?.hasOwnProperty('c8y_IsDevice')) {
      this.properties = [
        ...cloneDeep(defaultProperty),
        ...cloneDeep(devicePropertiesBaseObject),
        ...cloneDeep(computedPropertiesBaseObject)
      ];
    } else {
      const customProperties = this.getConstructCustomProperties(
        await this.assetPropertyService.getCustomProperties(this.deviceMO)
      );
      this.properties = [
        ...cloneDeep(defaultProperty),
        ...(customProperties ?? []),
        ...cloneDeep(computedPropertiesBaseObject)
      ];
    }
    this.properties = cloneDeep(this.constructCustomProperties());
  }

  constructCustomProperties(): IManagedObject[] {
    const simpleProperties: IManagedObject[] = [];
    const complexProperties: IManagedObject[] = [];
    const computedProperties: IManagedObject[] = [];
    this.properties.forEach(property => {
      property.active = false;
      if (this.isComplexProperty(property)) {
        complexProperties.push(property);
        this.flattenNestedComplexProperties(
          property.c8y_JsonSchema?.properties[property.name],
          complexProperties,
          property.name
        );
      } else if (property.computed) {
        computedProperties.push(property);
      } else {
        simpleProperties.push(property);
      }
    });
    return [...simpleProperties, ...complexProperties, ...computedProperties];
  }

  flattenNestedComplexProperties(
    property: IManagedObject,
    complexProperties: IManagedObject[],
    parentName?: string
  ): void {
    if (!property || !property.properties) return;

    Object.keys(property.properties).forEach(key => {
      const object = property.properties[key];
      const keyPath = property.keyPath ? [...property.keyPath] : [property.name || parentName];
      keyPath.push(key);
      object['keyPath'] = keyPath;
      complexProperties.push(object);
      if (object.properties) {
        this.flattenNestedComplexProperties(object, complexProperties);
      }
    });
  }

  onSelectProperty(property: IManagedObject) {
    if (property.active) {
      this.selectedProperty.push(cloneDeep(property));
      this.selectOrUnselectChildren(property, true);
    } else {
      this.removeUnselectedProperties(property);
      this.selectOrUnselectChildren(property, false);
    }
  }

  selectOrUnselectChildren(selectedProperty: IManagedObject, active: boolean) {
    if (!this.isComplexProperty(selectedProperty)) return;
    this.properties.forEach(property => {
      if (property.keyPath?.some(name => name === selectedProperty.name)) {
        property.active = active;
        if (active) {
          if (!some(this.selectedProperty, obj => isEqual(obj, property))) {
            this.selectedProperty.push(cloneDeep(property));
          }
        } else {
          property.active = active;
          this.removeUnselectedProperties(property);
        }
      }
    });
  }
  removeUnselectedProperties(property: IManagedObject) {
    const removeIndex = this.selectedProperty
      .map(function (item) {
        return item.keyValue?.[0] || item.name;
      })
      .indexOf(property.name);
    if (removeIndex > -1) this.selectedProperty.splice(removeIndex, 1);
  }

  onSaveButtonClicked(): void {
    this.savePropertySelection.emit(this.selectedProperty);
  }

  onCancelButtonClicked(): void {
    this.cancelPropertySelection.emit();
  }

  selectIsDisabled() {
    return this.properties?.every(({ active }) => !active);
  }

  isComplexProperty(prop: IManagedObject) {
    return (
      prop.c8y_JsonSchema?.properties[prop.name]?.type === 'object' || prop.properties !== undefined
    );
  }

  getConstructCustomProperties(customProperties): IManagedObject[] {
    const simpleProperties: IManagedObject[] = [];
    const constructCustomProperties: IManagedObject[] = [];
    customProperties.forEach(property => {
      const object = property.c8y_JsonSchema.properties[property.name];
      if (object.type === 'object') {
        constructCustomProperties.push(property);
      } else {
        simpleProperties.push(property);
      }
    });
    return simpleProperties.concat(constructCustomProperties);
  }
}
