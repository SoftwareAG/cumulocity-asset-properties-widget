// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
import asset_properties_widget_elements from '../support/page_objects/asset_properties_widget_elements';

const url = 'apps/sag-pkg-asset-properties-widget/index.html#/';
const unassignedDevice = 'div p[title="Unassigned devices"]';

describe('Device Properties Widget', function () {
  before(function () {
    cy.login();
    const devices = ['Device1', 'Device2', 'Device3'];
    for (let i = 0; i < devices.length; i++) {
      cy.createDevice(devices[i]);
    }
    cy.addChildDevice('Device2', 'Device3');
    const assetObject = [
      {
        type: 'Asset',
        icon: {
          name: '',
          category: ''
        },
        name: 'Asset Test',
        c8y_IsAsset: {}
      }
    ];
    cy.apiCreateSimpleAsset(assetObject);
    cy.addAssetToDevice('Device3', 'Asset Test');
  });

  beforeEach(function () {
    cy.login();
    cy.visitAndWaitUntilPageLoad(url);
    cy.get(asset_properties_widget_elements.addWidgetButton).click();
    cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
    cy.get(unassignedDevice).click();
  });

  function validate(propertyLabel: string, propertyValue: string) {
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    cy.selectProperty(propertyLabel);
    cy.get(asset_properties_widget_elements.selectButton).click();
    cy.get(asset_properties_widget_elements.saveButton).click();
    cy.validatePropertyValue(propertyLabel, propertyValue);
  }

  // User should be able to see the total count of child devices assigned to a device configured
  it('TC_Device_Properties_001', () => {
    cy.chooseAssetOrDevice('Device2');
    validate('Number of child devices', '1');
  });

  // User should be able to see "0" if no child device is assigned to a device.
  it('TC_Device_Properties_002', () => {
    cy.chooseAssetOrDevice('Device1');
    validate('Number of child devices', '0');
  });

  /* User should be able to configure any one the property eg. alarms/measurement/child device ,
       User should be able to configure all the properties for it same as parent device.*/
  it('TC_Device_Properties_003', () => {
    cy.clickOnAsset('Device2', 1);
    cy.chooseAssetOrDevice('Device3');
    validate('Number of child devices', '0');
  });

  // User should be able to select a nested property for a device property "Network" and Verify that on view the subchildrens are visible.
  it('TC_Device_Properties_004', () => {
    cy.chooseAssetOrDevice('Device1');
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    cy.selectProperty('Network');
    cy.get(asset_properties_widget_elements.selectButton).click();
    cy.get(asset_properties_widget_elements.saveButton).click();
    cy.contains('Network');
    cy.contains('Address range');
    cy.contains('DNS 2');
  });

  // User should be able to the count of total number of child assets assigned with the device(on view)
  it('TC_Device_Properties_005', () => {
    cy.clickOnAsset('Device2', 1);
    cy.chooseAssetOrDevice('Device3');
    validate('Number of child assets', '1');
  });

  // User should be able to see "0" if no child asset is assigned to a device.
  it('TC_Device_Properties_006', () => {
    cy.chooseAssetOrDevice('Device1');
    validate('Number of child assets', '0');
  });

  afterEach(function () {
    cy.deleteCard();
  });

  after(function () {
    cy.deleteAllDevices();
    cy.cleanup();
    cy.logout();
  });
});
