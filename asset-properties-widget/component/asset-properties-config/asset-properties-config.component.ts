import { Component, Input } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import { AssetSelectionChangeEvent } from '@c8y/ngx-components/assets-navigator';
import { ContextDashboardService } from '@c8y/ngx-components/context-dashboard';

@Component({
    selector: 'asset-properties-config',
    templateUrl: './asset-properties-config.component.html',
})
export class AssetPropertiesConfigComponent {
    @Input() config: any = {};
    propertiesHiddenForm:any;
    selectedAsset:IManagedObject
    contextDashboardServiceMock: any;

    constructor(private contextDashboardService: ContextDashboardService, private inventoryService: InventoryService) {}
    
   async ngOnInit(): Promise<void> {
        if(this.config.settings){
            try{
                this.selectedAsset = (await this.inventoryService.detail(this.config.asset.id)).data;
            }catch(er){
                 // intended empty
            }
            this.contextDashboardService.formDisabled = true;
        }
    }
    
    selectionChanged(selection: AssetSelectionChangeEvent) {
        this.config.asset = selection.change.item;
        this.contextDashboardService.formDisabled = false;
    }
}
