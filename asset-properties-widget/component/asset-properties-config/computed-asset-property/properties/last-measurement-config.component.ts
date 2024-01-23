import { Component, Input, Output, OnInit } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';

@Component({
  selector: 'c8y-last-measurement-config',
  templateUrl: './last-measurement-config.component.html',
})
export class ComputedPropertyLastMeasurementConfigComponent implements OnInit {
  @Input() property?: any;

  @Output() measurmentChange: Observable<any[]>;

  selectedProperty: IManagedObject[] = [];
  dataPoints: Array<any> = [];
  minSelectCount: number = 1;
  maxSelectCount: number = 1;
  configSchema: object = {properties:{type:{title: 'Event type',type: 'string'}},type: 'string'};

  ngOnInit(): void {
    this.dataPoints = this.property.config?.dp;
    console.log('datapoint',this.dataPoints);
  }

  validationChanged(isValid){
    this.property.config.isValid= isValid;
  }
}
