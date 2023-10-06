import { Component, OnInit, Input } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import { ManagedObjectRealtimeService, gettext } from '@c8y/ngx-components';
import { AssetPropertiesService } from '../asset-properties-config/asset-properties.service';

@Component({
    selector: 'asset-properties',
    templateUrl: './asset-properties-view.component.html',
    providers: [ManagedObjectRealtimeService]
})
export class AssetPropertiesViewComponent implements OnInit {
    selected = {id: 'asset-properties-widget'}
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
        if(this.config.asset){
            try{
                this.selectedAsset = (await this.inventoryService.detail(this.config.asset.id)).data;
                setTimeout(async () => {
                this.customProperties =  await this.assetPropertiesService.getCustomProperties(this.selectedAsset);
                this.config.properties.forEach((property, index, object) => {
                    if(!property.isExistingProperty &&  (this.customProperties.length > 0 && !this.customProperties.find((prop) => prop.id === property.id))){
                        object.splice(index, 1);
                    }
                });
                this.properties = this.config.properties;
                this.handleRealtime();
                },1000)
            }catch(error){
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
