import { Component, Input, OnChanges } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { IManagedObject } from '@c8y/client';
import { DynamicComponent, OnBeforeSave } from '@c8y/ngx-components';

@Component({
  selector: 'c8y-asset-properties-config',
  templateUrl: './asset-properties-config.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class AssetPropertiesConfigComponent
  implements DynamicComponent, OnBeforeSave, OnChanges
{
  @Input() config: any = {};
  assetProperties: IManagedObject;
  query: string = 'id name properties { name value } subassets { id name type } type';

  async ngOnChanges(){
    if (this.config.query) {
      this.query = this.config.query;
    }
  }
  
 async onBeforeSave(config: any): Promise<boolean> {
  this.config.query = this.query;
  return !!(
    config.query
  );
  }
}
