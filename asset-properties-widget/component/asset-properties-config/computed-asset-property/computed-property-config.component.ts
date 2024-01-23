import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IManagedObject } from '@c8y/client';

@Component({
  selector: 'c8y-computed-property-config-component',
  templateUrl: './computed-property-config-component.html',
})

export class ComputedPropertyConfigComponent implements OnInit {
  @Input() title?: string;
  @Input() property?: IManagedObject;
  @Input() index?:number;

  @Output() savePropertySelection = new EventEmitter<object>();
  @Output() cancelPropertySelection = new EventEmitter<void>();

  tempProperty: IManagedObject;
  config2: object = {type: 's7aRealTime_47773',_id: '5140160262811182'};
  configSchema: object = {properties:{type:{title: 'Event type',type: 'string'}},type: 'string'};
  constructor(private bsModal: BsModalRef) {}
  ngOnInit(): void {
    this.tempProperty = cloneDeep(this.property);
    // this.configSchema = this.property.c8y_JsonSchema;
    console.log('hii',this.configSchema);
  // this.customProperties = cloneDeep(this.constructCustomProperties());
  }

  onSaveButtonClicked(): void {
    this.property = this.tempProperty;
    this.savePropertySelection.emit({property:this.property,index:this.index});
    this.bsModal.hide();
  }

  onCancelButtonClicked(): void {
    this.bsModal.hide();
  }
  isSaveButtonDisabled(): boolean{
    if(this.tempProperty.name == 'lastMeasurement'){
    return !this.tempProperty.config?.isValid;
    }else{
      return !this.tempProperty.config?.type;
    }
  }

}
