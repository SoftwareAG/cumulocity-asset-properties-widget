import { Injectable } from '@angular/core';
import { AlarmService, EventService, IManagedObject, MeasurementService, OperationService } from '@c8y/client';

@Injectable({
  providedIn: 'root',
})
export class AssetPropertiesViewService {
  constructor(
    private c8yAlarms: AlarmService,
    private c8yEvents: EventService,
    private c8yMeasurements: MeasurementService,
    private c8yOperation: OperationService

  ) {}

  async getAlarms(filters): Promise<IManagedObject[]> {
    let data = [];
     await this.c8yAlarms.list(filters)
      .then(function (alarms) {
        data = alarms.data;
      });
    return data;
  }

  async getEvents(filters) {
    let data = [];
    await this.c8yEvents.list(filters)
      .then(events => {
        data = events.data;
      });
    return data;
  }

  async getMeasurements(filters) {
    let data = [];
    await this.c8yMeasurements.list(filters)
      .then(measurements => {
        data = measurements.data;
      });
    return data;
  }

  async getOperation(filters) {
    let data = [];
    await this.c8yOperation.list(filters)
      .then(measurements => {
        data = measurements.data;
      });
    return data;
  }
}
