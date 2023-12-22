import { Component, OnInit, Input } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import { ManagedObjectRealtimeService } from '@c8y/ngx-components';
import { AssetPropertiesService } from '../asset-properties-config/asset-properties.service';
import { some, cloneDeep } from 'lodash-es';

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
              ((this.customProperties.length != 0 &&
                this.customProperties.find((prop) => prop.id === property.id)) || this.validateComplexProperty(property))
            ) {
              return property;
            }
          });
          this.config.properties = cloneDeep(this.properties);
          this.constructComplexPropertyKeys();
          this.handleRealtime();
        }, 1000);
      } catch (error) {
        this.isEmptyWidget = true;
      }
    }
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
            property.c8y_JsonSchema.properties[property.c8y_JsonSchema.key].properties = {};
          }
          property.c8y_JsonSchema.properties[property.c8y_JsonSchema.key].properties[element.keyPath?.[1]] = {...element};
        }
        if(!customizedProperty.find((prop) => prop.id === property.id)){
          customizedProperty.push(property);
        }
      }else if (element.active && !customizedProperty.find((prop) => prop.name === element.name)){
        customizedProperty.push(element);
      }
    });
    this.properties = customizedProperty;
  }

  validateComplexProperty(item): boolean{
    if(item.keyPath){
      const property = this.customProperties.find((prop) => prop.name === item.keyPath?.[0]);
      return some(Object.keys(property.c8y_JsonSchema.properties[property.c8y_JsonSchema.key].properties), function(key) {
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
      prop.c8y_JsonSchema.properties[prop.c8y_JsonSchema.key]?.type === 'object'
    );
  }

  private handleRealtime() {
    this.moRealtimeService
      .onUpdate$(this.selectedAsset.id)
      .subscribe((asset: IManagedObject) => {
        this.selectedAsset = asset;
      });
  }
}
