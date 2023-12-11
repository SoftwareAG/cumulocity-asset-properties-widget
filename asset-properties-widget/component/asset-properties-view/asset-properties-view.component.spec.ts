import { IManagedObject } from '@c8y/client';
import { AssetPropertiesViewComponent } from './asset-properties-view.component';
import { of } from 'rxjs';

describe('AssetPropertiesViewComponent', () => {
  const date = new Date();
  let component: AssetPropertiesViewComponent;
  let inventoryMock: any;
  let moRealtimeServiceMock: any;
  let assetPropertiesServiceMock: any;
  let asset;
  let customPropertyObjects;
  let configCustomPropertyObjects;

  beforeEach(() => {
    inventoryMock = { detail: jest.fn() };
    moRealtimeServiceMock = { onUpdate$: jest.fn() };
    assetPropertiesServiceMock = { getCustomProperties:jest.fn() };
    jest.useFakeTimers();

    component = new AssetPropertiesViewComponent(
      inventoryMock,
      moRealtimeServiceMock,
      assetPropertiesServiceMock
    );

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
    configCustomPropertyObjects = [
      {
        name: 'color',
        description: '',
        label: 'Color',
        type: 'c8y_JsonSchema',
        id: '123',
        c8y_IsAssetProperty: {},
        c8y_Global: {},
        c8y_JsonSchema: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
              minLength: 2,
              maxLength: 3,
              minLengthValidate: true,
              maxLengthValidate: true
            }
          },
          required: [],
          key: 'color',
          title: 'Color'
        }
      },
      {
        name: 'length',
        description: '',
        label: 'Length',
        type: 'c8y_JsonSchema',
        id: '1234',
        c8y_IsAssetProperty: {},
        c8y_Global: {},
        c8y_JsonSchema: {
          type: 'object',
          properties: {
            length: {
              type: 'number',
              minimum: 2,
              maximum: 5,
              requiredMaximum: true,
              requiredMinimum: true
            }
          },
          required: [],
          key: 'length',
          title: 'Length'
        }
      }
    ];
    customPropertyObjects = [
      {
        name: 'color',
        description: '',
        label: 'Color',
        type: 'c8y_JsonSchema',
        id: '123',
        c8y_IsAssetProperty: {},
        c8y_Global: {},
        c8y_JsonSchema: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
              minLength: 2,
              maxLength: 3,
              minLengthValidate: true,
              maxLengthValidate: true
            }
          },
          required: [],
          key: 'color',
          title: 'Color'
        }
      }
    ];
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should get selected asset details and validate selected asset properties', async () => {
    // given
    component.config = { device: asset,properties: configCustomPropertyObjects};
    jest
      .spyOn(inventoryMock, 'detail')
      .mockReturnValue(Promise.resolve({ data: asset }));
    jest.spyOn(moRealtimeServiceMock, 'onUpdate$').mockReturnValue(of(asset));
    jest.spyOn(assetPropertiesServiceMock, 'getCustomProperties').mockReturnValue(customPropertyObjects);

    // when
    await component.ngOnInit();

    // then
    jest.runAllTimers();
    await Promise.resolve();
    expect(component.selectedAsset).toEqual(asset);
    expect(component.config.properties).toEqual(customPropertyObjects);
    expect(component.isEmptyWidget).toBe(false);
  });

  it('should shown blank widget if asset is deleted', async () => {
    // given
    component.config = { device: asset };
    jest.spyOn(inventoryMock, 'detail').mockRejectedValue('');

    // when
    await component.ngOnInit();

    // then
    expect(component.selectedAsset).toEqual(undefined);
    expect(component.isEmptyWidget).toBe(true);
  });
});
