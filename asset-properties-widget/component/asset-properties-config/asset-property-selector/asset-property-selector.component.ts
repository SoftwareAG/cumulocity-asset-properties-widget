import { Component, Input, OnChanges } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { cloneDeep, filter } from 'lodash-es';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { assetPropertyItemSelectorCtrlComponent } from '../asset-property-item-selector/asset-property-item-selector.component';
import { defaultProperty } from '../../../common/asset-property-constant';
import { some } from 'lodash-es';
import { ComputedPropertyConfigComponent } from '../computed-asset-property/computed-property-config.component';
import { gettext } from '@c8y/ngx-components';

type ModalInitialState = {
  title: string;
  deviceMO: IManagedObject;
};

@Component({
  selector: 'c8y-asset-property-selector',
  templateUrl: './asset-property-selector.component.html'
})
export class AssetPropertiesSelectorComponent implements OnChanges {
  @Input() config: IManagedObject;
  @Input() asset: IManagedObject;
  assetPropertySelectorModalRef: BsModalRef;
  computedPropertyConfigModalRef: BsModalRef;
  properties = cloneDeep(filter(defaultProperty, { active: true }));
  customProperties: Array<IManagedObject>;
  ExpandedComplexProperty: any;
  isAtleastOnePropertySelected: boolean = true;
  selectedComputedPropertyIndex: number;

  constructor(private modalService: BsModalService) {}

  async ngOnChanges(changes: IManagedObject): Promise<void> {
    if (changes.asset.currentValue?.hasOwnProperty('c8y_IsDevice')) {
      this.properties =
        this.config.properties || cloneDeep(filter(defaultProperty, { active: true }));
      if (changes.asset.previousValue?.hasOwnProperty('c8y_IsAsset')) {
        this.properties = cloneDeep(filter(defaultProperty, { active: true }));
      }
      this.config.properties = this.properties;
    } else if (!changes.asset.previousValue && this.config?.properties) {
      this.properties = this.config.properties;
    } else if (changes.asset.currentValue) {
      this.loadAssetProperty();
    }
    this.isAtleastOnePropertySelected = true;
  }

  async loadAssetProperty() {
    this.properties = cloneDeep(filter(defaultProperty, { active: true }));
    this.config.properties = this.properties;
  }

  addProperty() {
    const assetPropertySelectorModalOptions: ModalOptions<ModalInitialState> = {
      class: 'modal-lg',
      backdrop: 'static',
      initialState: {
        title: gettext('Select property'),
        deviceMO: this.asset
      }
    };
    this.assetPropertySelectorModalRef = this.modalService.show(
      assetPropertyItemSelectorCtrlComponent,
      assetPropertySelectorModalOptions
    );
    this.assetPropertySelectorModalRef.content.cancelPropertySelection.subscribe(() => {
      this.assetPropertySelectorModalRef.hide();
    });
    this.assetPropertySelectorModalRef.content.savePropertySelection.subscribe(
      (properties: IManagedObject[]) => {
        this.properties = this.properties.concat(this.removeSelectedProperties(properties));
        this.isAtleastOnePropertySelected = true;
        this.config.properties = this.properties;
        this.properties.forEach((property, index) => {
          if (
            property.computed &&
            property.config &&
            !(property.config.dp?.length > 0 || property.config.type)
          ) {
            this.config.properties[index].config = {
              ...this.config.properties[index].config,
              ...{ id: String(Math.random()).substr(2) }
            };
            this.configureComputedProperty(index);
          }
        });
        this.assetPropertySelectorModalRef.hide();
      }
    );
  }

  isComplexProperty(prop) {
    if (!prop.c8y_JsonSchema) {
      return false;
    }
    return prop.c8y_JsonSchema.properties[prop.name]?.type === 'object';
  }

  removeSelectedProperties(properties) {
    properties.forEach((property, index) => {
      const removeIndex = this.properties
        .map(function (item) {
          return item.name || item.title;
        })
        .indexOf(property.name || property.title);
      if (removeIndex >= 0 && !property.config) {
        this.properties[removeIndex] = property;
        properties.splice(index, 1);
        this.removeSelectedProperties(properties);
      }
    });
    return properties;
  }

  updateOptions() {
    this.isAtleastOnePropertySelected = some(this.properties, 'active');
  }

  removeProperty(property: IManagedObject) {
    const removeIndex = this.properties
      .map(function (item) {
        return item.name || item.title;
      })
      .indexOf(property.name || property.title);
    if (removeIndex >= 0) {
      this.properties.splice(removeIndex, 1);
      property['active'] = false;
      this.isAtleastOnePropertySelected =
        this.properties.length > 0 && some(this.properties, 'active');
    }
  }

  onRowExpanded(property) {
    this.ExpandedComplexProperty = property;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.properties, event.previousIndex, event.currentIndex);
  }

  configureComputedProperty(index) {
    this.selectedComputedPropertyIndex = index;
    this.computedPropertyConfigModalRef = this.modalService.show(ComputedPropertyConfigComponent, {
      backdrop: 'static',
      initialState: {
        title: gettext('Computed property configuration'),
        property: this.properties[index],
        index: index
      }
    });
    this.computedPropertyConfigModalRef.content.savePropertyConfiguration.subscribe(
      (object: any) => {
        this.config.properties[object.index] = object.property;
      }
    );
    this.computedPropertyConfigModalRef.content.cancelPropertyConfiguration.subscribe(
      (index: number) => {
        if (
          !(
            this.config.properties[index].config.dp?.length > 0 ||
            this.config.properties[index].config.type
          )
        ) {
          this.config.properties.splice(index, 1);
        }
      }
    );
  }
}
