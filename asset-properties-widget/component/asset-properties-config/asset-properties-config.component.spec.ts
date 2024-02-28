import { IManagedObject } from '@c8y/client';
import { AssetPropertiesConfigComponent } from './asset-properties-config.component';

describe('AssetPropertiesConfigComponent', () => {
  const date = new Date();
  let component: AssetPropertiesConfigComponent;
  let asset: any;
  let properties: any;
  let inventoryServiceMock: any;
  let deviceMO: any;

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
    deviceMO = {
      id: '674366',
      type: 'c8y_MQTTDevice',
      name: 'Ar-alarm-test #1',
      lastUpdated: '2024-02-21T16:00:48.171Z',
      creationTime: '2024-01-31T22:04:55.157Z',
      owner: 'service_device-simulator',
      childDevices: { references: [] },
      childAssets: { references: [] },
      childAdditions: { references: [{ managedObject: { id: '703401' } }] },
      deviceParents: { references: [] },
      assetParents: { references: [] },
      additionParents: { references: [] },
      c8y_ActiveAlarmsStatus: { critical: 3, major: 2, minor: 0, warning: 0 },
      c8y_IsDevice: {},
      c8y_SupportedOperations: [],
      c8y_Position: { lng: 5, alt: 5, lat: null },
    };
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

  it('should not retrieve device MOs if the device is selected', async () => {
    // given
    component.config = { settings: true, device: deviceMO };
    jest
      .spyOn(inventoryServiceMock, 'detail')
      .mockReturnValue(Promise.resolve({ data: deviceMO }));

    // when
    await component.ngOnChanges();

    // then
    expect(inventoryServiceMock.detail).not.toHaveBeenCalled();
    expect(component.selectedAsset).toEqual(deviceMO);
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
