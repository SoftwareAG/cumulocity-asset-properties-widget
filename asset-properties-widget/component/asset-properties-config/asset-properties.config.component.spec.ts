import { IManagedObject } from "@c8y/client";
import { AssetPropertiesConfigComponent } from "./asset-properties.config.component";

describe('AssetPropertiesConfigComponent', () => {
    const date = new Date();
    let component: AssetPropertiesConfigComponent;
    let contextDashboardServiceMock: any ;
    let asset;
    let inventoryServiceMock;
  
    beforeEach(() => {
      inventoryServiceMock = { detail: jest.fn() }
      component = new AssetPropertiesConfigComponent(contextDashboardServiceMock, inventoryServiceMock);
      contextDashboardServiceMock = {
        formDisabled: false
    }

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
})    