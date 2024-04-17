import { AssetPropertiesService } from './asset-properties.service';

describe('AssetPropertiesService', () => {
  let service: AssetPropertiesService;
  let inventoryServiceMock: any;
  let assetTypesMock: any;

  beforeEach(() => {
    inventoryServiceMock = { childAdditionsList: jest.fn() };
    assetTypesMock = { getAssetTypeByName: jest.fn() };
    service = new AssetPropertiesService(inventoryServiceMock, assetTypesMock);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('getCustomProperties', () => {
    it('should return custom properties when type is present', async () => {
      // given
      const assetMO = { name: 'Ar-file-test', id: '35157220', type: 'ar-file-test' } as any;
      const response = { status: 200, data: [{ id: '7094', lastUpdated: '2024-02-07T08:34:18.687Z', name: 'ar-file', type: 'file' }, { id: '70944589', lastUpdated: '2024-02-07T08:34:18.687Z', name: 'c8y_Position', type: 'c8y_JsonSchema' }] };
      assetTypesMock.getAssetTypeByName.mockReturnValue(assetMO.type);
      inventoryServiceMock.childAdditionsList.mockReturnValue(response);

      // when
      const obj = await service.getCustomProperties(assetMO);

      // expect
      expect(obj).toEqual(response.data);
      expect(assetTypesMock.getAssetTypeByName).toHaveBeenCalledWith(assetMO.type);
      expect(inventoryServiceMock.childAdditionsList).toHaveBeenCalledWith(assetMO.type, { pageSize: 2000, query: "$filter=(has('c8y_IsAssetProperty'))" });
    });

    it('should return empty array if type is not present', async () => {
      // given
      const assetMO = { name: 'Ar-file-test', id: '35157220' } as any;
      assetTypesMock.getAssetTypeByName.mockReturnValue(undefined);

      // when
      const obj = await service.getCustomProperties(assetMO);

      // expect
      expect(obj).toEqual([]);
      expect(assetTypesMock.getAssetTypeByName).not.toHaveBeenCalled();
      expect(inventoryServiceMock.childAdditionsList).not.toHaveBeenCalled();
    });
  });
});
