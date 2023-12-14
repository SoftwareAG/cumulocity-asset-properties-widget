import { NgModule } from '@angular/core';
import {
  CoreModule,
  HOOK_COMPONENTS,
  RealtimeModule,
} from '@c8y/ngx-components';
import * as preview from './common/preview';
import { AssetPropertiesViewComponent } from './component/asset-properties-view/asset-properties-view.component';
import { AssetPropertiesConfigComponent } from './component/asset-properties-config/asset-properties-config.component';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AssetPropertiesComponent } from './component/asset-properties-view/asset-properties/asset-properties.component';
import { AssetPropertiesItemComponent } from './component/asset-properties-view/asset-properties/asset-properties-item.component';
import { assetPropertyItemSelectorCtrlComponent } from './component/asset-properties-config/asset-property-item-selector/asset-property-item-selector.component';
import { AssetPropertiesSelectorComponent } from './component/asset-properties-config/asset-property-selector/asset-property-selector.component';
import { AssetLocationComponent } from './component/asset-properties-view/asset-properties/location/asset-location.component';
import { MapModule } from '@c8y/ngx-components/map';

@NgModule({
  declarations: [
    AssetPropertiesConfigComponent,
    AssetPropertiesSelectorComponent,
    assetPropertyItemSelectorCtrlComponent,
    AssetPropertiesViewComponent,
    AssetPropertiesComponent,
    AssetPropertiesItemComponent,
    AssetLocationComponent
  ],
  imports: [
    CoreModule,
    AssetSelectorModule,
    Ng2SearchPipeModule,
    DragDropModule,
    RealtimeModule,
    MapModule
  ],
  providers: [
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
        id: 'asset-properties-widget',
        label: 'Asset Properties 2.0',
        previewImage: preview.image,
        description: 'Editable form for asset properties widget',
        component: AssetPropertiesViewComponent,
        configComponent: AssetPropertiesConfigComponent,
        data: {
          ng1: {
            options: {
              noDeviceTarget: false,
              noNewWidgets: false,
              deviceTargetNotRequired: false,
              groupsSelectable: true,
              showUnassignedDevices: false,
              upgrade: true,
              configComponent: true,
              showChildDevices: false,
            },
          },
        },
      },
    },
  ],
})
export class AssetPropertiesWidgetModule {}
