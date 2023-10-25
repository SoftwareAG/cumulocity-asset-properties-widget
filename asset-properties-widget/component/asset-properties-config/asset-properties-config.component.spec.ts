import { IManagedObject } from "@c8y/client";
import { AssetPropertiesConfigComponent } from "./asset-properties-config.component";
import { AssetSelectionChangeEvent } from "@c8y/ngx-components/assets-navigator";

describe('AssetPropertiesConfigComponent', () => {
    const date = new Date();
    let component: AssetPropertiesConfigComponent;
    let contextDashboardServiceMock: any ;
    let asset;
    let properties;
    let inventoryServiceMock;
  
    beforeEach(() => {
      inventoryServiceMock = { detail: jest.fn() }
      component = new AssetPropertiesConfigComponent(contextDashboardServiceMock, inventoryServiceMock);
      contextDashboardServiceMock = {
        formDisabled: false
    }
    properties =[
      { c8y_JsonSchema:{properties :{name:{type: "string",label: "Name"}} }, name: 'name', label: "Name", type: "string", active: true, isEditable:true, isExistingProperty:true},
      {  c8y_JsonSchema:{properties :{type: {type: "string",label: "Asset model"}}},name: 'type', label: "Asset model",  type: "string", active: true,isEditable:false, isExistingProperty:true},
      ];

      asset = {
        id: 12,
        name: 'Test',
        address: {
          country: 'Germany',
          city: 'Düsseldorf',
          street: 'Toulouser Allee',
          postalCode: 40211,
          apartmentNumber: '25'
        },
        fileTest: [
          {
            file: new File([new Blob(['some content'])], 'values.json', {
              type: 'application/JSON'
            })
          }
        ],
        nameTest: 'test123',
        dateTest1: date.toISOString(),
        dateTest2: ''
      } as any as IManagedObject;
    });
  
    it('should exist', () => {
      expect(component).toBeTruthy();
    });

    it('should get selected asset MOs', async () => {
        // given
        component.config = {settings:true,asset: asset}
        jest.spyOn(inventoryServiceMock, 'detail').mockReturnValue(Promise.resolve({data: asset}))

        // when
       await component.ngOnInit()

        //then
        expect(component.selectedAsset).toEqual(asset);
    });

    it('should assign selected asset MOs to widget config', () => {
      // given
      const selection = {change:{item :asset}} as unknown as AssetSelectionChangeEvent;

      // when
      component.selectionChanged(selection)

      //then
      expect(component.config.asset).toEqual(asset);
      expect(component.isAssetSelected).toBeTruthy();
  });

  describe('onBeforeSave', () => {
    it('should return false if asset is not selected', async () => {
      // when
      const result = await component.onBeforeSave({});

      // expect
      expect(result).toEqual(false);
      expect(component.isAssetSelected).toBeFalsy();
    });

    it('should return true if asset is selected and at least one property is selected', async () => {
      //given
      const config = {asset:{asset},properties:properties};

      // when
      const result = await component.onBeforeSave(config);

      // expect
      expect(result).toEqual(true);
      expect(component.isAssetSelected).toBeTruthy();
    });

    it('should return false if non of property is selected', async () => {
      //given
      const config = {asset,properties:[]};

      // when
      const result = await component.onBeforeSave(config);

      // expect
      expect(result).toEqual(false);
      expect(component.isAssetSelected).toBeTruthy();
    });
  });
})    