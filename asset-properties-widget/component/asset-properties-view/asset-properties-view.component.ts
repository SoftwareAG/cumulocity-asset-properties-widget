import { Component, OnInit, Input } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import { ManagedObjectRealtimeService } from '@c8y/ngx-components';
import { AssetPropertiesService } from '../asset-properties-config/asset-properties.service';

@Component({
  selector: 'c8y-asset-properties-view',
  templateUrl: './asset-properties-view.component.html',
  providers: [ManagedObjectRealtimeService],
})
export class AssetPropertiesViewComponent implements OnInit {
  assetProperties: IManagedObject;
  isEmptyWidget: boolean = false;
  customProperties: IManagedObject[];
  properties: IManagedObject[];
  @Input() config: any;

  constructor(
    protected moRealtimeService: ManagedObjectRealtimeService,
    private assetPropertiesService: AssetPropertiesService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.config.device) {
      try {
        this.assetProperties = await this.assetPropertiesService.fetchAssetData(this.config.device.id, this.config.query);
      } catch (error) {
        this.isEmptyWidget = true;
      }
    }
  }

  isObjectType(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  getSubassetProperties(subasset: any): {key: string, value: any}[] {
    return Object.keys(subasset).map(key => ({ key, value: subasset[key] }));
  }

  // private handleRealtime() {
  //   this.moRealtimeService
  //     .onUpdate$(this.selectedAsset.id)
  //     .subscribe((asset: IManagedObject) => {
  //       this.selectedAsset = asset;
  //     });
  // }
}
