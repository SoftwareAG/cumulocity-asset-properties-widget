import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
    selector: 'schema-property-selector-component',
    templateUrl: './schema-property-selector.component.html',
})
export class schemaPropertySelectorCtrl {
    @Input() title?: string;
    @Input() customProperties?: any;
    @Input() propertiesList?: any;
    
    @Output() savePropertySelection = new EventEmitter<object>();
    @Output() cancelPropertySelection = new EventEmitter<void>();

    selectedProperty:IManagedObject[] =[]
    search:string =''

    constructor() {}

    ngOnInit(): void {}

    onSelectProperty(property) {
        
        if(property.active){
            this.selectedProperty.push(cloneDeep(property));
        }else{
            var removeIndex = this.selectedProperty.map(function(item) { return item.name; }).indexOf(property.name);
            if(removeIndex > -1)
            this.selectedProperty.splice(removeIndex, 1);
        }
    }

    onSaveButtonClicked(): void {
        this.savePropertySelection.emit(
            this.selectedProperty
        );
    }

    onCancelButtonClicked(): void {
        this.cancelPropertySelection.emit();
    }

    selectIsDisabled() {
        return this.customProperties.every(({ active }) => !active);
    }

    isComplexProperty (prop) {
        if(!prop.c8y_JsonSchema){
            return false
        }
        return (prop.c8y_JsonSchema.properties[prop.c8y_JsonSchema.key]?.type === 'object');
    }
}
