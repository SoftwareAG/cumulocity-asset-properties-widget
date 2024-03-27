import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IManagedObject } from '@c8y/client';

@Component({
  selector: 'c8y-computed-property-config-component',
  templateUrl: './computed-property-config-component.html'
})
export class ComputedPropertyConfigComponent implements OnInit {
  @Input() title?: string;
  @Input() property?: IManagedObject;
  @Input() index?: number;

  @Output() savePropertyConfiguration = new EventEmitter<object>();
  @Output() cancelPropertyConfiguration = new EventEmitter<any>();

  tempProperty: IManagedObject;
  constructor(private bsModal: BsModalRef) {}

  ngOnInit(): void {
    this.tempProperty = cloneDeep(this.property);
  }

  onSaveButtonClicked(): void {
    this.property = this.tempProperty;
    this.savePropertyConfiguration.emit({ property: this.property, index: this.index });
    this.bsModal.hide();
  }

  onCancelButtonClicked(): void {
    this.cancelPropertyConfiguration.emit(this.index);
    this.bsModal.hide();
  }

  isSaveButtonDisabled(): boolean {
    return this.tempProperty.name === 'lastMeasurement'
      ? !this.tempProperty.config?.isValid
      : !this.tempProperty.config?.type;
  }
}
