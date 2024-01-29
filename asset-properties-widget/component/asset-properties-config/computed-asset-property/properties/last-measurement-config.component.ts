import { Component, Input, Output, OnInit } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { RESULT_TYPES } from '../../../../common/asset-property-constant';

@Component({
  selector: 'c8y-last-measurement-config',
  templateUrl: './last-measurement-config.component.html',
})
export class ComputedPropertyLastMeasurementConfigComponent {
  @Input() property?: any;

  @Output() measurmentChange: Observable<any[]>;

  selectedProperty: IManagedObject[] = [];
  minSelectCount: number = 1;
  maxSelectCount: number = 1;
  resultTypes = RESULT_TYPES;

  validationChanged(isValid){
    this.property.config.isValid= isValid;
  }
}
