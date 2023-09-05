import { IManagedObject } from "@c8y/client";
import { AssetPropertiesViewComponent } from "./asset-properties-view.component";
import { of } from "rxjs";

describe('AssetPropertiesViewComponent', () => {
    const date = new Date();
    let component: AssetPropertiesViewComponent;
    let inventoryMock: any;
    let moRealtimeServiceMock: any;
    let assetPropertiesServiceMock:any;
    let asset;
  
    beforeEach(() => {
      inventoryMock = { detail:jest.fn() }
      moRealtimeServiceMock = {onUpdate$:jest.fn()}

      component = new AssetPropertiesViewComponent(inventoryMock, moRealtimeServiceMock, assetPropertiesServiceMock);

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

    it('should get selected asset details', async () => {
        // given
        component.config = {asset: asset};
        jest.spyOn(inventoryMock, 'detail').mockReturnValue(Promise.resolve({data: asset}))
        jest.spyOn(moRealtimeServiceMock, 'onUpdate$').mockReturnValue(of(asset))

        // when
        await component.ngOnInit()

        //then
        expect(component.selectedAsset).toEqual(asset);
        expect(component.isEmptyWidget).toBe(false);
    });

    it('should shown blank widget if asset is deleted', async () => {
        // given
        component.config = {asset: asset};
        jest.spyOn(inventoryMock, 'detail').mockRejectedValue('')

        // when
        await component.ngOnInit()

        //then
        expect(component.selectedAsset).toEqual(undefined);
        expect(component.isEmptyWidget).toBe(true);
    });
})    