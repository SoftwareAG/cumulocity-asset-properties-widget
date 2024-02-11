import { Component, OnInit, Input } from '@angular/core';
import { IAlarm, IEvent, IManagedObject, InventoryService } from '@c8y/client';
import { AlarmRealtimeService, EventRealtimeService, ManagedObjectRealtimeService, MeasurementRealtimeService } from '@c8y/ngx-components';
import { AssetPropertiesService } from '../asset-properties-config/asset-properties.service';
import { some, cloneDeep } from 'lodash-es';
import { KPIDetails } from '@c8y/ngx-components/datapoint-selector';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AssetPropertiesViewService } from './asset-properties-view.service';
import { DatePipe } from '@angular/common';
import { deviceProperty } from '../../common/asset-property-constant';

interface MeasurementValue {
  unit?: string;
  value: number;
  date: string;
  id: string;
}

@Component({
  selector: 'c8y-asset-properties-view',
  templateUrl: './asset-properties-view.component.html',
  providers: [ManagedObjectRealtimeService, MeasurementRealtimeService],
})
export class AssetPropertiesViewComponent implements OnInit {
  selected = { id: 'asset-properties-widget' };
  selectedAsset: IManagedObject;
  isEmptyWidget: boolean = false;
  customProperties: Array<IManagedObject>;
  properties: IManagedObject[];
  @Input() config: any;
  computedPropertyObject:object;
  isLoading = true;

  state$: Observable<{
    latestMeasurement: MeasurementValue;
  }>;

  constructor(
    protected inventoryService: InventoryService,
    protected moRealtimeService: ManagedObjectRealtimeService,
    private assetPropertiesService: AssetPropertiesService,
    private measurementRealtime: MeasurementRealtimeService,
    private assetPropertiesViewService: AssetPropertiesViewService,
    private datePipe: DatePipe,
    private alarmRealtimeService: AlarmRealtimeService,
    private eventRealtimeService: EventRealtimeService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.config.device) {
      try {
        this.selectedAsset = (
          await this.inventoryService.detail(this.config.device.id)
        ).data;
        setTimeout(async () => {
          // eslint-disable-next-line no-prototype-builtins
          if(this.selectedAsset.hasOwnProperty('c8y_IsAsset')){
            this.customProperties =
            await this.assetPropertiesService.getCustomProperties(
              this.selectedAsset
            );
            this.properties = this.config.properties.filter((property) => {
              if (
                property.isExistingProperty ||
                ((this.customProperties.length != 0 &&
                  this.customProperties.find((prop) => prop.id === property.id)) || this.validateComplexProperty(property))
              ) {
                return property;
              }
            });
           this.config.properties = cloneDeep(this.properties);
          }else{
            this.properties = cloneDeep(this.config.properties);
            this.customProperties = cloneDeep(deviceProperty);
          }
          this.constructComplexPropertyKeys();
          this.config.properties.forEach(property =>{
            if(property.computed && property.active){
             switch (property.name) {
              case 'alarmCountToday':
                this.getAlarmCount(this.config.device, property,this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
                break;
              case 'alarmCount3Months':
                this.getAlarmCount(this.config.device, property, this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 3), 'yyyy-MM-dd'));
                break;
              case 'eventCountToday':
                this.getEventCount(this.config.device, property,this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
                break;
              case 'eventCount3Months':
                this.getEventCount(this.config.device, property, this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 3), 'yyyy-MM-dd'));
                break;
              case 'lastMeasurement':
                this.getLastMeasurement(property);
                break;
                default:
                  break;
              }
            }
          });
          this.handleRealtime();
          this.isLoading = false;
        }, 1000);
      } catch (error) {
        this.isEmptyWidget = true;
      }
    }
  }

  async getAlarmCount(device:IManagedObject, property:IManagedObject, dateFrom:string){
    const filters = {
      dateFrom: dateFrom,
      dateTo: this.datePipe.transform(new Date(), 'yyyy-MM-ddThh:mm:ssZZZZZ'),
      source: device.id,
      pageSize: 2000,
      type: property.config.type,
    };
    const alarms = (await this.assetPropertiesViewService.getAlarms(filters));
      this.alarmRealtimeService.onCreate$(this.selectedAsset.id)
      .subscribe((alarm: IAlarm) => {
        if(alarm.type === property.config.type){
          this.computedPropertyObject = {...this.computedPropertyObject, ...{[`${property.name}_${property.config.id}`]: ++ this.computedPropertyObject[`${property.name}_${property.config.id}`]}};
        }
      });
    this.computedPropertyObject = {...this.computedPropertyObject, ...{[`${property.name}_${property.config.id}`]: alarms.length}};
  }

  async getEventCount(device:IManagedObject, property:IManagedObject, dateFrom:string){
    const filters = {
      dateFrom: dateFrom,
      dateTo: this.datePipe.transform(new Date(), 'yyyy-MM-ddThh:mm:ssZZZZZ'),
      source: device.id,
      pageSize: 2000,
      type: property.config.type,
    };
   const events = (await this.assetPropertiesViewService.getEvents(filters));
   this.eventRealtimeService.onCreate$(this.selectedAsset.id)
      .subscribe((event: IEvent ) => {
        if(event.type === property.config.type){
        this.computedPropertyObject = {...this.computedPropertyObject, ...{[`${property.name}_${property.config.id}`]: ++ this.computedPropertyObject[`${property.name}_${property.config.id}`]}};
        }
      });
   this.computedPropertyObject = {...this.computedPropertyObject, ...{[`${property.name}_${property.config.id}`]: events.length}};
  }

  getLastMeasurement(property){
    // eslint-disable-next-line no-underscore-dangle
    let datapoint = property.config.dp.find((dp) =>dp.__active);
    datapoint = {...datapoint, ...{uniqId:property.config.id}};
    this.getLatestMeasurement$(datapoint).subscribe(
     (lastMeasurement) => {
      this.computedPropertyObject = {...this.computedPropertyObject, ...{[`lastMeasurement_${lastMeasurement.id}`]: lastMeasurement}};
      }
   );
  }

  constructComplexPropertyKeys(){
    const customizedProperty =[];
    this.properties.forEach(element => {
      if(element.keyPath && element.active){
        const property = this.properties.find((prop) => prop.name === element.keyPath?.[0]) || this.customProperties.find((prop) => prop.name === element.keyPath?.[0]);
        if(property){
          if(!property.isParentKeySelected){
            property.isParentKeySelected = true;
            property.active = true;
            property.c8y_JsonSchema.properties[property.name].properties = {};
          }
          property.c8y_JsonSchema.properties[property.name].properties[element.keyPath?.[1]] = {...element};
        }
        if(!customizedProperty.find((prop) => prop.name === property.name)){
          customizedProperty.push(property);
        }
      }else if (element.active && (!customizedProperty.find((prop) => prop.name === element.name) || element.computed)){
        customizedProperty.push(element);
      }
    });
    this.properties = customizedProperty;
  }

  validateComplexProperty(item): boolean{
    if(item.keyPath){
      const property = this.customProperties.find((prop) => prop.name === item.keyPath?.[0]);
      return some(Object.keys(property.c8y_JsonSchema.properties[property.name].properties), function(key) {
        return (key === item.keyPath?.[1]);
      });
    }
    return false;
  }

  isComplexProperty(prop) {
    if (!prop.c8y_JsonSchema) {
      return false;
    }
    return (
      prop.c8y_JsonSchema.properties[prop.name]?.type === 'object'
    );
  }

  private handleRealtime() {
    this.moRealtimeService
      .onUpdate$(this.selectedAsset.id)
      .subscribe((asset: IManagedObject) => {
        this.selectedAsset = asset;
      });
  }

  getLatestMeasurement$(datapoint: KPIDetails): Observable<MeasurementValue> {
    return this.measurementRealtime
      .latestValueOfSpecificMeasurement$(
        datapoint.fragment,
        datapoint.series,
        datapoint.__target.id,
        // we only need the last two values in case we want to show a trend
         1
      )
      .pipe(
        filter(measurement => !!measurement),
        map(measurement => {
          return {
            unit: measurement[datapoint.fragment][datapoint.series].unit,
            value: measurement[datapoint.fragment][datapoint.series].value,
            date: measurement.time as string,
            id: datapoint.uniqId
          };
        })
      );
  }
}
