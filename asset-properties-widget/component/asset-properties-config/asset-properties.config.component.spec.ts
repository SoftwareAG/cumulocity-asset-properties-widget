import { IManagedObject } from "@c8y/client";
import { of } from "rxjs";
import { AssetPropertiesConfigComponent } from "./asset-properties.config.component";
import { ContextDashboardService } from "@c8y/ngx-components/context-dashboard";

describe('AssetPropertiesConfigComponent', () => {
    const date = new Date();
    let component: AssetPropertiesConfigComponent;
    let contextDashboardServiceMock: any ;
    let asset;
    let inventoryServiceMock;
  
    beforeEach(() => {
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

    it('should disabled save button', () => {
        // given
        //(ContextDashboardService as any).formDisabled = true;
        component.config = {asset: asset};
        component.config = {settings:true}
       // component[contextDashboardService] = {formDisabled:false}
        //jest.spyOn((ContextDashboardService as any),'formDisabled')
        // when
        component.ngOnInit()

        console.log(component.contextDashboardServiceMock.formDisabled)

        //then
       // expect(component.contextDashboardServiceMock.formDisabled).toBe(false);
       // expect(ContextDashboardService.prototype.formDisabled).toBe(false);
    });
})    