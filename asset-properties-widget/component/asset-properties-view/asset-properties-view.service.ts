import { Injectable } from '@angular/core';
import { AlarmService, EventService, IManagedObject } from '@c8y/client';

@Injectable({
  providedIn: 'root',
})
export class AssetPropertiesViewService {
  constructor(
    private c8yAlarms: AlarmService,
    private c8yEvents: EventService
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
}
