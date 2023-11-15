import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { IManagedObject } from '@c8y/client';
import { DynamicComponent, OnBeforeSave } from '@c8y/ngx-components';
import { AssetSelectionChangeEvent } from '@c8y/ngx-components/assets-navigator';
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
  selectedAsset: IManagedObject;
  isAssetSelected = true;

  constructor(
    private assetPropertiesService: AssetPropertiesService,
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.config.settings) {
      try {
        this.selectedAsset = await this.assetPropertiesService.fetchAssetData(this.config.asset.id);
      } catch (er) {
        // intended empty
      }
    }
  }

  selectionChanged(selection: AssetSelectionChangeEvent) {
    this.config.asset = selection.change.item;
    this.isAssetSelected = true;
  }

  onBeforeSave(config: any): boolean {
    this.isAssetSelected = Boolean(config.asset);
    return !!(
      config.properties &&
      config.properties.some((value) => value.active === true)
    );
  }
}
