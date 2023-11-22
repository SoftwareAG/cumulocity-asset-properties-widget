import { Component, OnInit, Input } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import { ManagedObjectRealtimeService } from '@c8y/ngx-components';
import { AssetPropertiesService } from '../asset-properties-config/asset-properties.service';

@Component({
  selector: 'c8y-asset-properties-view',
  templateUrl: './asset-properties-view.component.html',
  providers: [ManagedObjectRealtimeService],
})
export class AssetPropertiesViewComponent implements OnInit {
  selected = { id: 'asset-properties-widget' };
  selectedAsset: IManagedObject;
  isEmptyWidget: boolean = false;
  customProperties: IManagedObject[];
  properties: IManagedObject[];
  @Input() config: any;

  constructor(
    protected inventoryService: InventoryService,
    protected moRealtimeService: ManagedObjectRealtimeService,
    private assetPropertiesService: AssetPropertiesService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.config.device) {
      try {
        this.selectedAsset = (
          await this.inventoryService.detail(this.config.device.id)
        ).data;
        setTimeout(async () => {
          this.customProperties =
            await this.assetPropertiesService.getCustomProperties(
              this.selectedAsset
            );
          this.properties = this.config.properties.filter((property) => {
            if (
              property.isExistingProperty ||
              (this.customProperties.length != 0 &&
                this.customProperties.find((prop) => prop.id === property.id))
            ) {
              return property;
            }
          });
          this.config.properties = this.properties;
          this.handleRealtime();
        }, 1000);
      } catch (error) {
        this.isEmptyWidget = true;
      }
    }
  }

  private handleRealtime() {
    this.moRealtimeService
      .onUpdate$(this.selectedAsset.id)
      .subscribe((asset: IManagedObject) => {
        this.selectedAsset = asset;
      });
  }
}
