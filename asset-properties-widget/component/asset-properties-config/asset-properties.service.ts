import { Injectable } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import { AssetTypesService } from '@c8y/ngx-components';
@Injectable({
  providedIn: 'root',
})
export class AssetPropertiesService {
  constructor(
    protected inventoryService: InventoryService,
    protected assetTypes: AssetTypesService
  ) {}

  async getCustomProperties(group: IManagedObject): Promise<IManagedObject[]> {
    const assetType = this.assetTypes.getAssetTypeByName(group.type);
    if (assetType) {
      const { data } = await this.inventoryService.childAdditionsList(
        assetType,
        {
          pageSize: 2000,
          query: "$filter=(has('c8y_IsAssetProperty'))",
        }
      );
      return data;
    }
    return [];
  }
}
