import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { IManagedObject } from '@c8y/client';
import { DynamicComponent, OnBeforeSave } from '@c8y/ngx-components';
import { AssetPropertiesService } from '../asset-properties-config/asset-properties.service';

@Component({
  selector: 'c8y-asset-properties-config',
  templateUrl: './asset-properties-config.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class AssetPropertiesConfigComponent
  implements DynamicComponent, OnBeforeSave
{
  @Input() config: any = {};
  assetProperties: IManagedObject;
  query: string = 'id name properties { name value } subassets { id name type } type';

  constructor(
    private assetPropertiesService: AssetPropertiesService
  ) {}

 async onBeforeSave(config: any): Promise<boolean> {
  this.config.query = this.query;
    return true;
  }
}
