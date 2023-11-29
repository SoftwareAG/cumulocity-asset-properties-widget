import { IManagedObject } from '@c8y/client';
import { AssetPropertiesConfigComponent } from './asset-properties-config.component';

describe('AssetPropertiesConfigComponent', () => {
  const date = new Date();
  let component: AssetPropertiesConfigComponent;
  let asset;
  let properties;
  let inventoryServiceMock;

  beforeEach(() => {
    inventoryServiceMock = { detail: jest.fn() };
    component = new AssetPropertiesConfigComponent(inventoryServiceMock);
    properties = [
      {
        c8y_JsonSchema: {
          properties: { name: { type: 'string', label: 'Name' } },
        },
        name: 'name',
        label: 'Name',
        type: 'string',
        active: true,
        isEditable: true,
        isExistingProperty: true,
      },
      {
        c8y_JsonSchema: {
          properties: { type: { type: 'string', label: 'Asset model' } },
        },
        name: 'type',
        label: 'Asset model',
        type: 'string',
        active: true,
        isEditable: false,
        isExistingProperty: true,
      },
    ];

    asset = {
      id: 12,
      name: 'Test',
      address: {
        country: 'Germany',
        city: 'Düsseldorf',
        street: 'Toulouser Allee',
        postalCode: 40211,
        apartmentNumber: '25',
      },
      fileTest: [
        {
          file: new File([new Blob(['some content'])], 'values.json', {
            type: 'application/JSON',
          }),
        },
      ],
      nameTest: 'test123',
      dateTest1: date.toISOString(),
      dateTest2: '',
    } as any as IManagedObject;
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should get selected asset MOs', async () => {
    // given
    component.config = { settings: true, device: asset };
    jest
      .spyOn(inventoryServiceMock, 'detail')
      .mockReturnValue(Promise.resolve({ data: asset }));

    // when
    await component.ngOnChanges();

    // then
    expect(component.selectedAsset).toEqual(asset);
  });

  describe('onBeforeSave', () => {
    it('should return true if at least one property is selected', async () => {
      // given
      const config = { asset: { asset }, properties: properties };

      // when
      const result = await component.onBeforeSave(config);

      // expect
      expect(result).toEqual(true);
    });

    it('should return false if non of property is selected', async () => {
      // given
      const config = { asset, properties: [] };

      // when
      const result = await component.onBeforeSave(config);

      // expect
      expect(result).toEqual(false);
    });
  });
});
