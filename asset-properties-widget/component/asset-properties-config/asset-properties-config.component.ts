import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { IManagedObject, InventoryService } from '@c8y/client';
import { DynamicComponent, OnBeforeSave } from '@c8y/ngx-components';
import { AssetSelectionChangeEvent } from '@c8y/ngx-components/assets-navigator';
import { ContextDashboardService } from '@c8y/ngx-components/context-dashboard';

@Component({
    selector: 'asset-properties-config',
    templateUrl: './asset-properties-config.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AssetPropertiesConfigComponent implements DynamicComponent, OnBeforeSave {
    @Input() config: any = {};
    selectedAsset:IManagedObject
    isAssetSelected= true;

    constructor(private contextDashboardService: ContextDashboardService, private inventoryService: InventoryService) {}
    
   async ngOnInit(): Promise<void> {
        if(this.config.settings){
            try{
                this.selectedAsset = (await this.inventoryService.detail(this.config.asset.id)).data;
            }catch(er){
                 // intended empty
            }
        }
    }
    
    selectionChanged(selection: AssetSelectionChangeEvent) {
        this.config.asset = selection.change.item;
        this.isAssetSelected = true;
    }

    onBeforeSave(config: any): boolean {
        if (!config.asset || !(config.properties.map(function(item) { return item.active}).indexOf(true) > -1)) {
            this.isAssetSelected = config.asset ? true : false;
          return false;
        }
        return true;
    } 
}
