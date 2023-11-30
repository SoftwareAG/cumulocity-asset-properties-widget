import { Injectable } from '@angular/core';
import { IManagedObject, InventoryService, FetchClient } from '@c8y/client';
import { AssetTypesService } from '@c8y/ngx-components';

@Injectable({
  providedIn: 'root',
})

export class AssetPropertiesService {
  constructor(
    protected inventoryService: InventoryService,
    protected assetTypes: AssetTypesService,
    private fetchClient: FetchClient
  ) {}

  async getCustomProperties(group: IManagedObject): Promise<IManagedObject[]> {
    if(group && group.type){
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
    }
    return [];
  }

  async fetchAssetData(assetId: string, query:string): Promise<IManagedObject> {
    const GRAPHQL_ENDPOINT = '/service/dtm-assets-synchro/graphql';
    const requestBody = {
      query: `query {
        c8y_asset(id: "${assetId}") {
          ${query}
        }
      }`
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    };

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.fetchClient.fetch(GRAPHQL_ENDPOINT, fetchOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error when fetching asset data. Status: ${response.status} - ${errorText}`);
      }

      const jsonData = await response.json();

      if ( !jsonData || !jsonData.c8y_asset ) {
        throw new Error('Failed to fetch asset data. The response does not have the expected structure.');
      }

      return jsonData.c8y_asset;
    } catch (error) {
      throw error;
    }
  }
}