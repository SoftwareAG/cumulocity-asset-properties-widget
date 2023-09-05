import { NgModule } from '@angular/core';
import { CoreModule, HOOK_COMPONENTS, RealtimeModule } from '@c8y/ngx-components';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AssetPropertiesConfigComponent } from './component/asset-properties-config/asset-properties.config.component';
import { MatTableModule } from '@angular/material/table';
import * as preview from './common/preview';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AssetPropertiesViewComponent } from './component/asset-properties-view/asset-properties-view.component';
import { AssetSelectorModule} from '@c8y/ngx-components/assets-navigator';
import { AssetPropertiesSelectorComponent } from './component/asset-properties-config/asset-property-selector.component';
import { schemaPropertySelectorCtrl } from './component/asset-property-selector-model/schema-property-selector.component';
import { AssetPropertiesComponent } from './asset-properties-widget-view/asset-properties.component';
import { AssetPropertiesItemComponent } from './asset-properties-widget-view/asset-properties-item.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserModule } from '@angular/platform-browser';
import {  DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AssetPropertiesConfigComponent,
    AssetPropertiesSelectorComponent,
    schemaPropertySelectorCtrl,
    AssetPropertiesViewComponent,
    AssetPropertiesComponent,
    AssetPropertiesItemComponent
   ],
  imports: [
    CommonModule,
    CoreModule,
    TypeaheadModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    AssetSelectorModule,
    Ng2SearchPipeModule,
    BrowserModule,
    DragDropModule,
    RealtimeModule
  ],
  providers: [
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
        id: 'asset-properties-widget',
        label: 'Asset Properties',
        previewImage: preview.image,
        description: 'Editable form for asset properties',
        component: AssetPropertiesViewComponent,
        configComponent: AssetPropertiesConfigComponent,
        data: {
          ng1: {
            options: {
              noDeviceTarget: true,
              noNewWidgets: false,
              deviceTargetNotRequired: false,
              groupsSelectable: true,
              showUnassignedDevices: false,
              upgrade:true,
              configComponent:true
            }
          }
        }
      }
    }
  ]
})
export class AssetPropertiesWidgetModule {}
