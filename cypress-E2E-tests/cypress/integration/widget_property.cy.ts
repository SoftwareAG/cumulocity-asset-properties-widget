// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
import asset_properties_widget_elements from '../support/page_objects/asset_properties_widget_elements';
import dtm_generic_page_elements from '../support/page_objects/dtm_generic_page_elements';

const url = 'apps/sag-pkg-asset-properties-widget/index.html#/';
const device = 'div p[title="Unassigned devices"]';

describe('Asset Properties Widget: Child Devices Count', function () {
    before(function () {
      cy.login(); 
    });
  
    beforeEach(function () {
      cy.login();
      cy.createDevice('Device1');
      cy.createDevice('Device2');
      cy.visitAndWaitUntilPageLoad(url);
    });
  
    // User should be able to see the total count of child devices assigned to a device configured
    it('TC_Asset_Properties_Widget_config_001', () => {
      cy.addChildDevice('Device1','Device2');
      cy.get(asset_properties_widget_elements.addWidgetButton).click();
      cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
      cy.get(device).click();
      cy.chooseAssetOrDevice('Device1');
      cy.get(asset_properties_widget_elements.addPropertyButton).click();
      cy.selectProperty('Number of child devices');
      cy.get(asset_properties_widget_elements.selectButton).click();
      cy.get(asset_properties_widget_elements.saveButton).click();
      cy.get('p[title="Number of child devices"]').should('exist');
      cy.validatePropertyValue('Number of child devices','1');
    });

    // User should be able to see "0" if no child device is assigned to a device.
    it('TC_Asset_Properties_Widget_config_001', () => {
        cy.get(asset_properties_widget_elements.addWidgetButton).click();
        cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
        cy.get(device).click();
        cy.chooseAssetOrDevice('Device1')
        cy.get(asset_properties_widget_elements.addPropertyButton).click();
        cy.selectProperty('Number of child devices');
        cy.get(asset_properties_widget_elements.selectButton).click();
        cy.get(asset_properties_widget_elements.saveButton).click();
        cy.get('p[title="Number of child devices"]').should('exist');
        cy.validatePropertyValue('Number of child devices','0');
      });

     /*User should be able to configure any one the property eg. alarms/measurement/child device ,
       User should be able to configure all the properties for it same as parent device.*/
    it.only('TC_Asset_Properties_Widget_config_001', () => {
      cy.addChildDevice('Device1','Device2');
      cy.get(asset_properties_widget_elements.addWidgetButton).click();
      cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
      cy.get(device).click();
      cy.clickOnAsset('Device1')
      cy.get(asset_properties_widget_elements.addPropertyButton).click();
      cy.selectProperty('Number of child devices');
      cy.get(asset_properties_widget_elements.selectButton).click();
      cy.get(asset_properties_widget_elements.saveButton).click();
      cy.get('p[title="Number of child devices"]').should('exist');
      cy.validatePropertyValue('Number of child devices','0');
    });

       // User should be able to select a nested property for a device property "Network" and Verify that on view the subchildrens are visible.
    it('TC_Asset_Properties_Widget_config_001', () => {
        cy.get(asset_properties_widget_elements.addWidgetButton).click();
        cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
        cy.get(device).click();
        cy.chooseAssetOrDevice('Device1')
        cy.get(asset_properties_widget_elements.addPropertyButton).click();
        cy.selectProperty('Network');
        cy.get(asset_properties_widget_elements.selectButton).click();
        cy.get(asset_properties_widget_elements.saveButton).click();
        cy.contains('Network')
        cy.contains("Address range");
        cy.contains("DNS 2");
      });
      
    //User should be able to the count of total number of child assets assigned with the device(on view)
      it('TC_Asset_Properties_Widget_config_001', () => {
        const assetObject = [
          {
            type: 'Asset',
            icon: {
              name: '',
              category: ''
            },
            name: 'Asset Test',
            c8y_IsAsset: {},
          }
        ];
        cy.apiCreateSimpleAsset(assetObject);
        cy.addAssetToDevice('Device1','Asset Test');
        cy.get(asset_properties_widget_elements.addWidgetButton).click();
        cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
        cy.get(device).click();
        cy.chooseAssetOrDevice('Device1')
        cy.get(asset_properties_widget_elements.addPropertyButton).click();
        cy.selectProperty('Number of child assets');
        cy.get(asset_properties_widget_elements.selectButton).click();
        cy.get(asset_properties_widget_elements.saveButton).click();
        cy.validatePropertyValue('Number of child assets','1');
      });

      //User should be able to see "0" if no child device is assigned to a device.
      it('TC_Asset_Properties_Widget_config_001', () => {
        cy.get(asset_properties_widget_elements.addWidgetButton).click();
        cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
        cy.get(device).click();
        cy.chooseAssetOrDevice('Device1')
        cy.get(asset_properties_widget_elements.addPropertyButton).click();
        cy.selectProperty('Number of child assets');
        cy.get(asset_properties_widget_elements.selectButton).click();
        cy.get(asset_properties_widget_elements.saveButton).click();
        cy.validatePropertyValue('Number of child assets','0')
      });

      afterEach(function () {
       cy.deleteAllDevices();
       cy.deleteCard();
      });


})