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
  errorMessage: string = '';
  @Input() config: any;

  constructor(
    protected moRealtimeService: ManagedObjectRealtimeService,
    private assetPropertiesService: AssetPropertiesService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.config.device) {
      try {
        this.assetProperties = await this.assetPropertiesService.fetchAssetData(this.config.device.id, this.config.query);

        if (this.assetProperties) {
          this.assetProperties = await this.transformAssetProperties(this.assetProperties);
        }
      } catch (error) {
        this.isEmptyWidget = true;
        this.errorMessage = error;
      }
    }
  }

  async transformAssetProperties(assetProperties: IManagedObject): Promise<any> {
    let assetProperties_tmp = {}; // Start with an empty object
  
    // Iterate over each key in the original asset object
    Object.keys(assetProperties).forEach(key => {
      if (Array.isArray(assetProperties[key])) {
        // Transform each item in the array if it has 'name' and 'value'
        assetProperties_tmp[key] = assetProperties[key].map(item => {
          if (this.hasNameAndValue(item)) {
            // Check if the 'value' is an object, and transform it if so
            if (this.isNonPrimitiveObject(item.value)) {
              const transformedValue = Object.keys(item.value).map(propertyKey => {
                return { [propertyKey]: item.value[propertyKey] };
              });
              return { [item.name]: transformedValue };
            } else {
              // If 'value' is not an object, keep the original structure
              return { [item.name]: item.value };
            }
          } else {
            // If the item doesn't have 'name' and 'value', keep it as is
            return item;
          }
        });
      } else {
        // For non-array properties, simply copy them over
        assetProperties_tmp[key] = assetProperties[key];
      }
    });
  
    return assetProperties_tmp;
  }
  
  // Check if the item has both 'name' and 'value' keys
  hasNameAndValue(item: any): boolean {
    return item.hasOwnProperty('name') && item.hasOwnProperty('value');
  }
  
  // Check if the value is a non-primitive object (excluding arrays and primitives)
  isNonPrimitiveObject(value: any): boolean {
    return (typeof value === 'object' && value !== null && !Array.isArray(value));
  }

  // private handleRealtime() {
  //   this.moRealtimeService
  //     .onUpdate$(this.selectedAsset.id)
  //     .subscribe((asset: IManagedObject) => {
  //       this.selectedAsset = asset;
  //     });
  // }
}
