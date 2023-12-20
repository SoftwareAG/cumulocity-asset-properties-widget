import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'c8y-asset-property-item-selector-component',
  templateUrl: './asset-property-item-selector.component.html',
})
export class assetPropertyItemSelectorCtrlComponent implements OnInit {
  @Input() title?: string;
  @Input() customProperties?: any;
  @Input() propertiesList?: any;

  @Output() savePropertySelection = new EventEmitter<object>();
  @Output() cancelPropertySelection = new EventEmitter<void>();

  selectedProperty: IManagedObject[] = [];
  search: string = '';
  properties: object = [];

  ngOnInit(): void {
   this.customProperties = cloneDeep(this.constructCustomProperties());
  }

  constructCustomProperties(): IManagedObject[] {
    const simpleProperties: IManagedObject[] = [];
    const constructCustomProperties: IManagedObject[] = [];
    this.customProperties.forEach((property) => {
      if (this.isComplexProperty(property)) {
        constructCustomProperties.push(property);
        Object.keys(property.c8y_JsonSchema.properties[property.c8y_JsonSchema.key].properties).forEach((key)=>{
          const object = property.c8y_JsonSchema.properties[property.c8y_JsonSchema.key].properties[key];
          object['keyPath'] = [property.name];
          object.keyPath.push(key);
          constructCustomProperties.push(object);
        });

      } else {
        constructProperties.push(property);
      }
    });
    return constructProperties.concat(constructCustomProperties);
  }

  onSelectProperty(property) {
    if (property.active) {
      this.selectedProperty.push(cloneDeep(property));
      this.selectOrUnselectChildren(property, true);
    } else {
      this.removeUnselectedProperties(property);
      this.selectOrUnselectChildren(property, false);
    }
  }

  selectOrUnselectChildren(selectedProperty, active){
    if(this.isComplexProperty(selectedProperty)){
      this.customProperties.forEach((property) => {
        if(property.keyPath?.[0] === selectedProperty.name){
          property.active = action;
          if(action){
            this.selectedProperty.push(cloneDeep(property));
          }else{
            property.active = action;
            this.removeUnselectedProperties(property);
          }
        }
      });
    }
  }
  removeUnselectedProperties(property){
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
    return this.customProperties.every(({ active }) => !active);
  }

  isComplexProperty(prop) {
    if (!prop.c8y_JsonSchema) {
      return false;
    }
    return (
      prop.c8y_JsonSchema.properties[prop.c8y_JsonSchema.key]?.type === 'object'
    );
  }
}
