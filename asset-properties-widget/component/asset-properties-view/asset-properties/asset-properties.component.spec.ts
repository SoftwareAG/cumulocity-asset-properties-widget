import { IManagedObject } from '@c8y/client';
import { AssetPropertiesComponent } from './asset-properties.component';
import { JSONSchema7 } from 'json-schema';

describe('AssetPropertiesComponent', () => {
  let component: AssetPropertiesComponent;
  let alertMock: any;
  let inventoryBinaryMock: any;
  let inventoryMock: any;
  let assetTypesMock: any;
  let appStateMock: any;
  let userMock: any;
  let permissionsServiceMock: any;

  beforeEach(() => {
    permissionsServiceMock = { canEdit: jest.fn() };
    assetTypesMock = { getAssetTypeByName: jest.fn() };
    inventoryMock = {
      update: jest.fn(),
      detail: jest.fn(),
      childAdditionsRemove: jest.fn(),
      childAdditionsAdd: jest.fn(),
    };
    alertMock = { success: jest.fn(), addServerFailure: jest.fn() };
    inventoryBinaryMock = { create: jest.fn() };
    userMock = { hasAnyRole: jest.fn() };

    component = new AssetPropertiesComponent(
      assetTypesMock,
      inventoryMock,
      inventoryBinaryMock,
      alertMock,
      appStateMock,
      userMock,
      permissionsServiceMock
    );
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('parseItem', () => {
    let properties;
    let asset;
    const date = new Date();
    beforeEach(() => {
      properties = [
        {
          id: 1,
          name: 'address',
          active: true,
          c8y_JsonSchema: {
            type: 'object',
            title: 'Address',
            properties: {
              address: {
                type: 'object',
                title: 'address',
                properties: {
                  country: {
                    minLength: 1,
                    minLengthValidate: true,
                    type: 'string',
                    title: 'Country',
                  },
                  city: {
                    minLengthValidate: true,
                    type: 'string',
                    title: 'City',
                  },
                  street: {
                    minLength: 1,
                    minLengthValidate: true,
                    type: 'string',
                    title: 'Street',
                  },
                  postalCode: {
                    requiredMinimum: true,
                    type: 'number',
                    title: 'Postal Code',
                  },
                  apartmentNumber: {
                    minLength: 1,
                    minLengthValidate: true,
                    type: 'string',
                    title: 'Apartment Number',
                  },
                },
              },
            },
            required: [],
            key: 'address',
          },
          description: '',
          label: 'Address',
          c8y_IsAssetProperty: {},
          c8y_Global: {},
        },
        {
          id: 2,
          type: 'c8y_JsonSchema',
          name: 'nameTest',
          c8y_Global: {},
          c8y_JsonSchema: {
            type: 'object',
            title: 'TestName',
            properties: {
              nameTest: {
                type: 'string',
              },
            },
            required: [],
            key: 'nameTest',
          },
          description: '',
          label: 'TestName',
          c8y_IsAssetProperty: {},
        },
        {
          id: 3,
          type: 'c8y_JsonSchema',
          name: 'fileTest',
          c8y_Global: {},
          c8y_JsonSchema: {
            type: 'object',
            title: 'File',
            properties: {
              fileTest: {
                type: 'file',
                allowedFileTypes: [''],
              },
            },
            required: [],
            key: 'fileTest',
          },
          description: '',
          label: 'FileTest',
          c8y_IsAssetProperty: {},
        },
        {
          id: 4,
          type: 'c8y_JsonSchema',
          name: 'dateTest1',
          c8y_Global: {},
          c8y_JsonSchema: {
            type: 'object',
            title: 'TestDate1',
            properties: {
              dateTest1: {
                type: 'date',
              },
            },
            required: [],
            key: 'dateTest1',
          },
          description: '',
          label: 'TestDate1',
          c8y_IsAssetProperty: {},
        },
        {
          id: 5,
          type: 'c8y_JsonSchema',
          name: 'dateTest2',
          c8y_Global: {},
          c8y_JsonSchema: {
            type: 'object',
            title: 'TestDate2',
            properties: {
              dateTest2: {
                type: 'date',
              },
            },
            required: [],
            key: 'dateTest2',
          },
          description: '',
          label: 'TestDate2',
          c8y_IsAssetProperty: {},
        },
      ] as any as IManagedObject[];
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

    it('should use correct labels on complex object', async () => {
      // given
      const result = await component.parseItem(
        properties[0],
        properties[0].c8y_JsonSchema.properties,
        asset
      );

      // then
      expect(result).toBeTruthy();
      const labels = result[0].complex.map((obj) => obj.label);
      expect(result[0].label).toEqual('Address');
      expect(labels).toEqual([
        'Country',
        'City',
        'Street',
        'Postal Code',
        'Apartment Number',
      ]);
    });

    it('should use correct label on simple text', async () => {
      // when
      const result = await component.parseItem(
        properties[1],
        properties[1].c8y_JsonSchema.properties,
        asset
      );

      // then
      expect(result).toBeTruthy();
      expect(result[0].label).toEqual('TestName');
    });

    it('should parse date string to date object', async () => {
      // when
      const result = await component.parseItem(
        properties[3],
        properties[3].c8y_JsonSchema.properties,
        asset
      );

      // then
      expect(result[0].value instanceof Date).toBeTruthy();
      expect(result[0].value).toEqual(date);
    });

    it('should set value to null if type of property is date but value is not valid date string', async () => {
      // when
      const result = await component.parseItem(
        properties[4],
        properties[4].c8y_JsonSchema.properties,
        asset
      );

      // then
      expect(result[0].value).toBeNull();
    });

    it('should set empty value of complex object if no value is provided', async () => {
      // given
      const assetWitNoValue = { ...asset, address: undefined };

      // when
      const result = await component.parseItem(
        properties[0],
        properties[0].c8y_JsonSchema.properties,
        assetWitNoValue
      );

      // then
      expect(result[0].value).toEqual({
        country: undefined,
        city: undefined,
        street: undefined,
        postalCode: undefined,
        apartmentNumber: undefined,
      });
    });

    it('should try to upload files and attach it as childAddition', async () => {
      // given
      const inventoryBinarySpy = jest
        .spyOn(inventoryBinaryMock, 'create')
        .mockReturnValue(
          Promise.resolve({
            data: { id: 1 },
          })
        );
      const inventorySpy = jest
        .spyOn(inventoryMock, 'childAdditionsAdd')
        .mockReturnValue(Promise.resolve());
      const result = await component.parseItem(
        properties[2],
        properties[2].c8y_JsonSchema.properties,
        asset
      );
      component.asset = asset;

      // when
      await component.save(asset, result[0]);

      // then
      expect(result[0].label).toEqual('FileTest');
      expect(inventoryBinarySpy).toHaveBeenCalled();
      expect(inventorySpy).toHaveBeenCalledWith(1, 12);
    });

    it('should try to upload files and attach it as childAddition, if one exist remove it', async () => {
      // given
      const inventoryBinarySpy = jest
        .spyOn(inventoryBinaryMock, 'create')
        .mockResolvedValue({ data: { id: 1 } });
      const inventoryRemoveSpy = jest
        .spyOn(inventoryMock, 'childAdditionsRemove')
        .mockResolvedValue(Promise.resolve());
      const result = await component.parseItem(
        properties[2],
        properties[2].c8y_JsonSchema.properties,
        asset
      );
      component.asset = asset;
      result[0].value[0] = 2;

      // when
      await component.save(asset, result[0]);

      // then
      expect(result[0].label).toEqual('FileTest');
      expect(inventoryBinarySpy).toHaveBeenCalled();
      expect(inventoryRemoveSpy).toHaveBeenCalledWith(2, 12);
    });

    it('should save to backend if model has only undefined values and property type is string', async () => {
      // given
      const inventoryUpdateSpy = jest
        .spyOn(inventoryMock, 'update')
        .mockResolvedValue({ data: {} });
      const prop = { isEdit: true, type: 'string' };
      component.asset = { id: '1' } as IManagedObject as any;

      // when
      await component.save({ test: undefined }, prop as any);

      // then
      expect(inventoryUpdateSpy).toHaveBeenCalledWith({ id: '1', test: null });
      expect(prop.isEdit).toBe(false);
    });

    it('should be sorted correctly 1/2', async () => {
      // given
      jest.spyOn(assetTypesMock, 'getAssetTypeByName').mockReturnValue({
        c8y_IsAssetType: {
          properties: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        },
      });
      component.properties = properties;
      component.asset = asset;

      // when
      await component.loadAsset();

      // then
      expect(component.properties[0].id).toBe(1);
    });

    it('should assign isRequired to all nested fields when property is complex and required', async () => {
      // given
      jest.spyOn(assetTypesMock, 'getAssetTypeByName').mockReturnValue({
        c8y_IsAssetType: {
          properties: [{ id: 1, isRequired: true }],
        },
      });
      component.properties = properties;
      component.asset = asset;

      // when
      await component.loadAsset();

      // then
      expect(component.customProperties[0].jsonSchema.required).toEqual([]);
      expect(
        (
          component.customProperties[0].jsonSchema.properties[
            'address'
          ] as JSONSchema7
        ).required
      ).toEqual(['country', 'city', 'street', 'postalCode', 'apartmentNumber']);
    });

    it('should delete a title form MO jsonSchema', async () => {
      // when
      const result = await component.parseItem(
        properties[0],
        properties[0].c8y_JsonSchema.properties,
        asset
      );

      // then
      expect(result[0].jsonSchema.properties.address).not.toHaveProperty(
        'title'
      );
    });

    it('should disabled properties edit icon', async () => {
      // given
      jest.spyOn(permissionsServiceMock, 'canEdit').mockReturnValue(true);

      // when
      await component.ngOnInit();

      // then
      expect(component.isEditDisabled).toBe(false);
    });

    it('should enable properties edit icon', async () => {
      // given
      jest.spyOn(permissionsServiceMock, 'canEdit').mockReturnValue(false);

      // when
      await component.ngOnInit();

      // then
      expect(component.isEditDisabled).toBe(true);
    });
  });
});
