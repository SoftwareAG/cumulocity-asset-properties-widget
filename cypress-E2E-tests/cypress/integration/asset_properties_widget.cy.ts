/// <reference types="cypress" />
import asset_properties_widget_elements from '../support/page_objects/asset_properties_widget_elements';
import '@4tw/cypress-drag-drop';

const assetProperties = 'Asset Properties';
const title = 'Asset Properties Updated';
const titleTextElement = '.p-r-24 > .form-group > label';
const titleFieldId = '#widgetTitle';
const searchElement = "c8y-search-input input[placeholder='Search for groups or assets…']";
const assetsTextElement = '.miller-column__header > .d-flex > .text-truncate';
const textElement = '.text-12';
const selectPropElement = 'schema-property-selector-component > .modal-header > #modal-title';
const backArrowElement = '.dlt-c8y-icon-angle-left';
const editWidgetHeadetElement = "div[title='Edit widget']";
const cardTitleElement = '.card-title > span';
const devices = ['Device1', 'Device2'];
const assetName = 'Test Asset2';
const groupObject = {
  label: 'Group',
  name: 'group',
  description: '',
  c8y_IsAssetType: {
    icon: {
      category: '',
      name: ''
    },
    properties: [],
    allowedAssetTypes: [],
    isNoneChildAssetsAllowed: 'false'
  }
};
const assets = [
  'check 3',
  'Test Asset2',
  'Test Asset3',
  'Test Asset4',
  'Test Asset5',
  'Test Asset6'
];
const assetObject1 = [
  {
    type: 'building',
    icon: {
      name: '',
      category: ''
    },
    name: 'check 1',
    c8y_IsAsset: {},
    c8y_IsDeviceGroup: {}
  }
];
const assetObject2 = [
  {
    type: 'floor',
    icon: {
      name: '',
      category: ''
    },
    name: 'check 2',
    c8y_IsAsset: {},
    c8y_IsDeviceGroup: {}
  }
];
const assetObject3 = [
  {
    type: 'room',
    icon: {
      name: '',
      category: ''
    },
    name: 'check 4',
    c8y_IsAsset: {},
    c8y_IsDeviceGroup: {}
  }
];
const roomProperties = [{ label: 'Color', isRequired: 'false' }];

describe('Asset Properties Widget: Configuration/View screen tests', function () {
  before(function () {
    cy.login();
    cy.createAssetTypesAndPropertyForBuildingHierarchy();
    cy.apiCreateAssetModel(groupObject, roomProperties);
    for (let i = 0; i < devices.length; i++) {
      cy.createDevice(devices[i]);
    }
    for (let i = 0; i < assets.length; i++) {
      const assetObject = [
        {
          type: 'group',
          icon: {
            name: '',
            category: ''
          },
          name: assets[i],
          c8y_IsAsset: {},
          c8y_IsDeviceGroup: {}
        }
      ];
      cy.apiCreateSimpleAsset(assetObject);
    }
    cy.apiCreateSimpleAsset(assetObject1);
    cy.apiCreateSimpleAsset(assetObject2);
    cy.apiCreateSimpleAsset(assetObject3);
    cy.apiAssignChildAsset(['check 2'], 'check 1');
    cy.apiAssignChildAsset(['check 4'], 'check 2');
  });

  beforeEach(function () {
    cy.login();
    cy.visitAndWaitUntilPageLoad(`apps/asset-properties/index.html#/`);
    cy.get(asset_properties_widget_elements.addWidgetButton).click();
    cy.get(asset_properties_widget_elements.cardElement).click();
  });

  // Verify the presence of configuration, Appearance and Select widget options on the top bar
  it('TC_Asset_Properties_Widget_config_001', () => {
    cy.get(asset_properties_widget_elements.selectWidgetButton).should('exist');
    cy.get(asset_properties_widget_elements.configurationButton).should('exist');
    cy.get(asset_properties_widget_elements.appearanceButton).should('exist');
  });

  // // Verify the presence of Title feild and it is editable
  // it('TC_Asset_Properties_Widget_config_002', () => {
  //   cy.get(titleTextElement).should('contain.text', 'Title');
  //   cy.get(titleFieldId).should('have.value', assetProperties);
  //   cy.get(titleFieldId).clear().type(title);
  // });

  // // Verify the presence of  Properties text, Add Prperty button, Show, Label, Key columns for the Properties section elements
  // it('TC_Asset_Properties_Widget_config_003', () => {
  //   const propertiesTextElement = '.d-block > .form-group > label';
  //   const elementForShow = "[style='width: 10%;'] > label";
  //   const elementForLabel = 'thead > :nth-child(3)';
  //   const elementForKey = 'thead > :nth-child(4)';
  //   cy.get(propertiesTextElement).should('have.text', 'Properties');
  //   cy.get(asset_properties_widget_elements.addPropertyButton);
  //   cy.get(elementForShow).should('have.text', 'Show');
  //   cy.get(elementForLabel).should('have.text', 'Label');
  //   cy.get(elementForKey).should('have.text', 'Key');
  // });

  // // Verify the presence of Properties section row elements
  // it('TC_Asset_Properties_Widget_config_004', () => {
  //   const labels = ['Name', 'ID', 'Asset model'];
  //   const keys = ['name', 'id', 'type'];
  //   for (let i = 1; i < 4; i++) {
  //     cy.get(':nth-child(' + i + ') > .cdk-drag-handle > .dlt-c8y-icon-bars').should('exist');
  //     cy.get(':nth-child(' + i + ") > [style='width: 5%;'] > .btn > .dlt-c8y-icon-times").should(
  //       'exist'
  //     );
  //     cy.get(':nth-child(' + i + ') > :nth-child(3) > .form-control').should(
  //       'have.value',
  //       labels[i - 1]
  //     );
  //     cy.get(':nth-child(' + i + ') > :nth-child(4) > span').should('have.text', keys[i - 1]);
  //   }
  // });

  // // Verify that removing the property reflects under Properties section
  // it('TC_Asset_Properties_Widget_config_005', () => {
  //   const title = 'type';
  //   const keyElement = ':nth-child(3) > :nth-child(4) > span';
  //   cy.get(keyElement).should('have.text', title);
  //   cy.get(":nth-child(3) > [style='width: 5%;'] > .btn > .dlt-c8y-icon-times").click();
  //   cy.get(keyElement).should('not.exist');
  // });

  // // Type in the title without selecting any asset, verify that save button should be disabled.
  // it('TC_Asset_Properties_Widget_config_006', () => {
  //   cy.get(titleFieldId).clear().type(title);
  //   cy.get(asset_properties_widget_elements.saveButton).should('be.disabled');
  // });

  // // Type in the title by selecting any asset, click on save and verify if the changes are getting reflected
  // it('TC_Asset_Properties_Widget_config_007', () => {
  //   cy.get(titleFieldId).clear().type(title);
  //   cy.selectAsset(assetName);
  //   cy.get(asset_properties_widget_elements.saveButton).click();
  //   cy.get(cardTitleElement).should('contain.text', assetProperties);
  //   cy.deleteCard();
  // });

  // // Verify the presence of cancel and save button.
  // it('TC_Asset_Properties_Widget_config_008', () => {
  //   cy.get(asset_properties_widget_elements.cancelButton).should('exist');
  //   cy.get(asset_properties_widget_elements.saveButton).should('exist');
  // });

  // // CHECK WITH DEEKSHITH
  // // Change the order of properties and click on cancel button,Verify that the changes are not being saved.
  // it('TC_Asset_Properties_Widget_config_009', () => {
  //   cy.get(':nth-child(2) > .cdk-drag-handle').drag(':nth-child(1) > .cdk-drag-handle');
  //   cy.get(asset_properties_widget_elements.cancelButton).click();
  // });

  // // CHECK WITH DEEKSHITH
  // // Change the order of properties and click on save button,Verify if the order in which user has changed is properly getting displayed on widget cover.
  // it('TC_Asset_Properties_Widget_config_010', () => {
  //   cy.get(':nth-child(2) > .cdk-drag-handle').drag(':nth-child(1) > .cdk-drag-handle');
  //   cy.selectAsset(assetName);
  //   cy.get(asset_properties_widget_elements.saveButton).click();
  //   cy.deleteCard();
  // });

  // // Check whether user is able to change the order of the properties by dragging it up down
  // it('TC_Asset_Properties_Widget_config_011', () => {
  //   cy.get(':nth-child(2) > .cdk-drag-handle').drag(':nth-child(1) > .cdk-drag-handle');
  //   cy.get(':nth-child(1) > .cdk-drag-handle').drag(':nth-child(2) > .cdk-drag-handle');
  // });

  // // Verify the presence and functionality of add property button. On clicking of which should display a preview window with list of default properties
  // it('TC_Asset_Properties_Widget_config_012', () => {
  //   const defaultProp = ['name', 'id', 'type', 'owner', 'lastUpdated'];
  //   cy.get(asset_properties_widget_elements.addPropertyButton).click();
  //   cy.get(selectPropElement).should('have.text', 'Select property');
  //   for (let i = 0; i < defaultProp.length; i++) {
  //     cy.get(`div[title='${defaultProp[i]}']`).should('exist');
  //   }
  // });

  // // Verify that filtering the property in Select property works as expected
  // it('TC_Asset_Properties_Widget_config_013', () => {
  //   const title = ['owner', 'name'];
  //   cy.get(asset_properties_widget_elements.addPropertyButton).click();
  //   cy.get(asset_properties_widget_elements.filterProperties).type(title[0]);
  //   cy.get(`div[title='${title[0]}']`).should('exist');
  //   cy.get(`div[title='${title[1]}']`).should('not.exist');
  // });

  // // Verify the presence of Show, label and key column,cancel and select button
  // it('TC_Asset_Properties_Widget_config_014', () => {
  //   cy.get(asset_properties_widget_elements.addPropertyButton).click();
  //   cy.get(selectPropElement).should('have.text', 'Select property');
  //   cy.get(asset_properties_widget_elements.selectButton).should('exist');
  //   cy.get(asset_properties_widget_elements.propertyCancelButton).should('exist');
  //   const columnName = ['Show', 'Label', 'Key'];
  //   for (let i = 1; i < 4; i++) {
  //     cy.get('.row > :nth-child(' + i + ') > label').should('have.text', columnName[i - 1]);
  //   }
  // });

  // // Verify User should be able to check and uncheck the required fields
  // it('TC_Asset_Properties_Widget_config_015', () => {
  //   const ownerTitle = 'owner';
  //   cy.get(asset_properties_widget_elements.addPropertyButton).click();
  //   cy.selectAssetProperty(ownerTitle);
  //   cy.unselectAssetProperty(ownerTitle);
  // });

  // // select button should be disabled until any field is checked
  // it('TC_Asset_Properties_Widget_config_016', () => {
  //   cy.get(asset_properties_widget_elements.addPropertyButton).click();
  //   cy.get(asset_properties_widget_elements.selectButton).should('be.disabled');
  // });

  // // Verify Select button should be disabled until any field is checked
  // it('TC_Asset_Properties_Widget_config_017', () => {
  //   const title = 'owner';
  //   cy.get(asset_properties_widget_elements.addPropertyButton).click();
  //   cy.get(asset_properties_widget_elements.selectButton).should('be.disabled');
  //   cy.selectAssetProperty(title);
  //   cy.get(asset_properties_widget_elements.selectButton).should('be.enabled');
  // });

  // // Verify that checking any field and click on select, user should be able to see the selected field in configuartion properties and save it.
  // it('TC_Asset_Properties_Widget_config_018', () => {
  //   const title = 'owner';
  //   const keyElement = ':nth-child(4) > :nth-child(4) > span';
  //   cy.selectAsset(assetName);
  //   cy.get(asset_properties_widget_elements.addPropertyButton).click();
  //   cy.selectAssetProperty(title);
  //   cy.get(asset_properties_widget_elements.selectButton).click();
  //   cy.get(keyElement).should('have.text', title);
  //   cy.get(asset_properties_widget_elements.saveButton).click();
  //   cy.get(cardTitleElement).should('contain.text', assetProperties);
  //   cy.deleteCard();
  // });

  // // Verify the presence of heading Asset Properties and description text
  // it('TC_Asset_Properties_Widget_config_019', () => {
  //   const description = 'Editable form for asset properties';
  //   cy.contains(assetProperties);
  //   cy.contains(description);
  // });

  // // Verify the presence of text asset selection and search bar with message"search for group or asset".
  // it('TC_Asset_Properties_Widget_config_020', () => {
  //   const selectionTextElement = '.p-b-8 > .text-medium';
  //   cy.get(selectionTextElement).should('have.text', ' Asset selection ');
  //   cy.get(searchElement).should('exist');
  //   cy.get(assetsTextElement).should('contain.text', 'Assets');
  // });

  // // User should be able to select the asset.
  // it('TC_Asset_Properties_Widget_config_021', () => {
  //   cy.selectAsset(assetName);
  //   cy.get(asset_properties_widget_elements.saveButton).should('be.enabled');
  //   cy.get(asset_properties_widget_elements.cancelButton).should('be.enabled');
  // });

  // // Verify that on click of an asset in Asset selection section it should navigate to the next screen displaying its subassets
  // it('TC_Asset_Properties_Widget_config_022', () => {
  //   const assetName1 = 'check 1';
  //   const subassetName = 'check 2';
  //   cy.get(asset_properties_widget_elements.loadMoreButton).click();
  //   cy.get(`p[title='${assetName1}']`).click();
  //   cy.get(textElement).should('contains.text', 'Assets > ' + assetName1);
  //   cy.get(`p[title='${subassetName}']`).should('exist');
  // });

  // // Also user can navigate back  to respective parent asset using '<'.
  // it('TC_Asset_Properties_Widget_config_023', () => {
  //   const assetName1 = 'check 1';
  //   const subassetName = 'check 2';
  //   cy.get(asset_properties_widget_elements.loadMoreButton).click();
  //   cy.get(`p[title='${assetName1}']`).click();
  //   cy.get(textElement).should('contains.text', 'Assets > ' + assetName1);
  //   cy.get(`p[title='${subassetName}']`).should('exist');
  //   cy.get(backArrowElement).click();
  //   cy.get(assetsTextElement).should('contain.text', 'Assets');
  // });

  // // User can select only one asset at a time.
  // it('TC_Asset_Properties_Widget_config_024', () => {
  //   const assetName = 'check 1';
  //   const assetName1 = 'check 3';
  //   cy.get(asset_properties_widget_elements.loadMoreButton).click();
  //   cy.selectAsset(assetName);
  //   cy.selectAsset(assetName1);
  //   cy.get(`div[title='Assets > ${assetName}']`)
  //     .children('div[class*="m-l-4 m-r-4 miller-column__item__checkbox"]')
  //     .children('label')
  //     .children('input[type="radio"]')
  //     .should('be.not.checked');
  // });

  // // User should be able to search sibling  assets on the search bar.Apply filter in assets search textbox and verify.
  // it('TC_Asset_Properties_Widget_config_025', () => {
  //   const assetName = 'check 1';
  //   const searchResultsElement = '.legend > span';
  //   cy.get(searchElement).type(assetName);
  //   cy.get(searchResultsElement).should('have.text', 'Search results');
  //   cy.get(
  //     `[title='${assetName}'] > :nth-child(1) > .c8y-list__item__block > .c8y-list__item__body`
  //   ).click();
  //   cy.get(asset_properties_widget_elements.radioButton).should('be.checked');
  //   cy.get(assetsTextElement).should('contains.text', assetName);
  //   cy.get('.btn > .text-primary').click();
  //   cy.get(assetsTextElement).should('contain.text', 'Assets');
  // });

  // // On selecting the asset,user should be able to view all asset properties associated with that asset.Verify if checkboxes for properties are selected by default
  // it('TC_Asset_Properties_Widget_config_026', () => {
  //   const prop = 'Color';
  //   const assetName = 'check 1';
  //   const subassetName = 'check 1 > check 2 > check 4';
  //   cy.get(searchElement).type(assetName);
  //   cy.get(
  //     `[title='${assetName}'] > :nth-child(1) > .c8y-list__item__block > .c8y-list__item__body`
  //   ).click();
  //   cy.get('.p-l-4 > .dlt-c8y-icon-angle-right').click();
  //   cy.selectSubasset(subassetName);
  //   cy.get(asset_properties_widget_elements.addPropertyButton).click();
  //   // workaround for assettypes cache issue
  //   cy.selectAssetProperty('owner');
  //   cy.get(asset_properties_widget_elements.selectButton).click();
  //   cy.get(asset_properties_widget_elements.addPropertyButton).click();
  //   // workaround for assettypes cache issue
  //   cy.get(`div[title='${prop}']`).should('exist');
  // });

  // // Verfify the presence of load more button if there are more number of assets present in the application
  // it('TC_Asset_Properties_Widget_config_027', () => {
  //   cy.get(asset_properties_widget_elements.loadMoreButton).should('exist').click();
  // });

  // // Clearing the title field value should result in error
  // it('TC_Asset_Properties_Widget_config_028', () => {
  //   cy.get(titleFieldId).clear();
  //   cy.get(searchElement).click();
  //   cy.get('.form-control-feedback-message > .d-block').should(
  //     'contain.text',
  //     'This field is required.'
  //   );
  // });

  // // Verify the search functionality works as expected when there are no matching records
  // it('TC_Asset_Properties_Widget_config_029', () => {
  //   const assetName = 'eee';
  //   const searchResultsElement = '.legend > span';
  //   const strongTextElement = '.c8y-empty-state > .d-flex > .text-medium';
  //   const smallTextElement = '.small > small';
  //   cy.get(searchElement).type(assetName);
  //   cy.get(searchResultsElement).should('have.text', 'Search results');
  //   cy.get(strongTextElement).should('have.text', 'No match found.');
  //   cy.get(smallTextElement).should('have.text', 'Try to rephrase your search word.');
  // });

  // // Verify that on click of an asset in Asset selection section it should navigate to the next screen displaying empty state message
  // it('TC_Asset_Properties_Widget_config_030', () => {
  //   const assetName = 'check 3';
  //   const backArrowElement = '.dlt-c8y-icon-angle-left';
  //   const filterElement = '.dlt-c8y-icon-filter';
  //   cy.get(assetsTextElement).should('contain.text', 'Assets');
  //   cy.get(asset_properties_widget_elements.loadMoreButton).click();
  //   cy.get(`p[title='${assetName}']`).click();
  //   cy.get(textElement).should('contains.text', 'Assets > ' + assetName);
  //   cy.get(backArrowElement).should('exist');
  //   cy.get('input[placeholder="Filter this column…"]').click();
  //   cy.get(filterElement).should('exist');
  //   cy.get('.c8y-empty-state > .d-flex > .text-medium').should(
  //     'have.text',
  //     'No results to display.'
  //   );
  //   cy.get('p.small').should('have.text', 'The selected asset has no children.');
  // });

  // // Verify that unchecking the property reflects under Properties section
  // it('TC_Asset_Properties_Widget_config_031', () => {
  //   const checkboxSelectedElement = ':nth-child(1) > [style="width: 10%;"] > .ng-untouched';
  //   const checkboxUnSelectElement = ':nth-child(1) > [style="width: 10%;"] > .ng-valid';
  //   cy.get(checkboxSelectedElement).click();
  //   cy.get(checkboxUnSelectElement).should('exist');
  // });

  // // Verify that cancel button works as expected
  // it('TC_Asset_Properties_Widget_config_032', () => {
  //   cy.get(asset_properties_widget_elements.cancelButton).click();
  //   cy.get(asset_properties_widget_elements.addWidgetButton).should('exist');
  // });

  // // Verify the presence of cancel and save button.
  // it('TC_Asset_Properties_Widget_config_033', () => {
  //   cy.get(asset_properties_widget_elements.cancelButton).should('exist');
  //   cy.get(asset_properties_widget_elements.saveButton).should('exist');
  // });

  // // Asset property widget title can be duplicate
  // it('TC_Asset_Properties_Widget_config_034', () => {
  //   cy.selectAssetAndSave(assetName);
  //   cy.get(asset_properties_widget_elements.widgetDashboardAddWidgetButton).click();
  //   cy.get(asset_properties_widget_elements.cardElement).click();
  //   cy.selectAssetAndSave(assetName);
  //   cy.deleteWidgetInstances([assetProperties, assetProperties]);
  // });

  // // Verify the presence "No widgets to display" meessage in the dashboard
  // it('TC_Asset_Properties_Widget_view_001', () => {
  //   cy.get(asset_properties_widget_elements.cancelButton).click();
  //   const message = 'No widgets to display';
  //   cy.contains(message);
  // });

  // // Verify the presence of Name,ID and Type rows property fields.
  // it('TC_Asset_Properties_Widget_view_002', () => {
  //   cy.selectAssetAndSave(assetName);
  //   cy.get(cardTitleElement).should('contain.text', assetProperties);
  //   cy.get("p[title='Name']").should('exist');
  //   cy.get("p[title='ID']").should('exist');
  //   cy.get("p[title='Asset model']").should('exist');
  //   cy.deleteCard();
  // });

  // // Verify the presence of settings symbol at the top. User should be able to see edit and remove option on clicking it.
  // it('TC_Asset_Properties_Widget_view_003', () => {
  //   cy.selectAssetAndSave(assetName);
  //   cy.get(asset_properties_widget_elements.settingsButton).should('exist').click();
  //   cy.get(asset_properties_widget_elements.removeWidgetButton).should('exist');
  //   cy.get(asset_properties_widget_elements.editWidgetButton).should('exist');
  //   cy.get(asset_properties_widget_elements.settingsButton).click();
  //   cy.deleteCard();
  // });

  // // User should be able to navigate to configuation page on clicking of edit button.
  // it('TC_Asset_Properties_Widget_view_004', () => {
  //   cy.selectAssetAndSave(assetName);
  //   cy.get(asset_properties_widget_elements.settingsButton).click();
  //   cy.get(asset_properties_widget_elements.editWidgetButton).click();
  //   cy.get(editWidgetHeadetElement).should('exist');
  //   cy.get(asset_properties_widget_elements.cancelButton).click();
  //   cy.deleteCard();
  // });

  // // Click on remove button, user will get and remove widget confirmation pop up. click on remove button verify the absence of widget.
  // it('TC_Asset_Properties_Widget_view_005', () => {
  //   const removePopupElement = '[data-cy="prompt-alert"] > .d-flex > span';
  //   const messageElement = '.text-break-word';
  //   const message =
  //     'You are about to remove widget "Asset Properties" from your dashboard. Do you want to proceed?';
  //   cy.selectAssetAndSave(assetName);
  //   cy.get(asset_properties_widget_elements.settingsButton).click();
  //   cy.get(asset_properties_widget_elements.removeWidgetButton).click();
  //   cy.get(removePopupElement).should('have.text', 'Remove widget');
  //   cy.get(messageElement).should('have.text', message);
  //   cy.get(asset_properties_widget_elements.removeButton).click();
  //   cy.contains('No widgets to display');
  // });

  // // Click on remove button, user will get and remove widget confirmation pop up. click on cancel button verify the presence of widget.
  // it('TC_Asset_Properties_Widget_view_006', () => {
  //   cy.selectAssetAndSave(assetName);
  //   cy.get(asset_properties_widget_elements.settingsButton).click();
  //   cy.get(asset_properties_widget_elements.removeWidgetButton).click();
  //   cy.get(asset_properties_widget_elements.propertyCancelButton).click();
  //   cy.get(cardTitleElement).should('contain.text', assetProperties);
  //   cy.deleteCard();
  // });

  // //User should be able to click on edit , do some changes and save it. Changes done should be reflected on view.Properties other than these can be edited and saved.
  // it('TC_Asset_Properties_Widget_view_007', () => {
  //   const assetNameElement = ':nth-child(1) > .card-block > c8y-asset-properties-item > p';
  //   cy.selectAssetAndSave(assetName);
  //   cy.get(assetNameElement).should('contains.text', 'Test Asset2');
  //   cy.get(asset_properties_widget_elements.settingsButton).click();
  //   cy.get(asset_properties_widget_elements.editWidgetButton).click();
  //   cy.get(editWidgetHeadetElement).should('exist');
  //   cy.get(asset_properties_widget_elements.changeButton).should('exist').click();
  //   cy.selectAsset('Test Asset3');
  //   cy.get(asset_properties_widget_elements.saveButton).click();
  //   cy.get(assetNameElement).should('contains.text', 'Test Asset3');
  //   cy.deleteCard();
  // });

  // // Asset name should be editable
  // it('TC_Asset_Properties_Widget_view_009', () => {
  //   const assetNameElement = ':nth-child(1) > .card-block > c8y-asset-properties-item > p';
  //   const propFeildElement = '#formly_2_string_name_0';
  //   const saveElement = '.btn-primary';
  //   cy.selectAssetAndSave(assetName);
  //   cy.clickPropertyEditButton('Name');
  //   cy.get(propFeildElement).clear().type('New Asset');
  //   cy.get(saveElement).click();
  //   cy.get(assetNameElement).should('contains.text', 'New Asset');
  //   cy.deleteCard();
  // });

  after(function () {
    cy.cleanup();
  });
});

describe('Asset Properties Widget: Permissions tests', function () {
  const user = 'test_user';
  const asset1 = 'SAG_building_Read';
  const asset2 = 'SAG_building_Write';

  function getAssetObject(assetName) {
    return {
      c8y_IsAsset: {},
      c8y_IsDeviceGroup: {},
      c8y_Notes: 'creating for testing purpose',
      icon: { name: '', category: '' },
      name: assetName,
      type: 'building'
    };
  }

  before(function () {
    cy.login();
    cy.createUser(user);
    cy.createAssetTypesAndPropertyForBuildingHierarchy();
    const assetRead = getAssetObject(asset1);
    cy.apiCreateSimpleAsset([assetRead]).then(id => {
      cy.assignUserInventoryRole([{ assetId: id, username: user, roleId: 1 }]);
    });
    const assetWrite = getAssetObject(asset2);
    cy.apiCreateSimpleAsset([assetWrite]).then(id => {
      cy.assignUserInventoryRole([{ assetId: id, username: user, roleId: 2 }]);
    });
    cy.visitAndWaitUntilPageLoad(`apps/asset-properties/index.html#/`);
    cy.get(asset_properties_widget_elements.addWidgetButton).click();
    cy.get(asset_properties_widget_elements.cardElement).click();
    cy.get(titleFieldId).clear().type(asset1);
    cy.selectAssetPropertyAndSave(asset1, 'lastUpdated');
    cy.get(asset_properties_widget_elements.widgetDashboardAddWidgetButton).click();
    cy.get(asset_properties_widget_elements.cardElement).click();
    cy.get(titleFieldId).clear().type(asset2);
    cy.selectAssetPropertyAndSave(asset2, 'lastUpdated');
    cy.logout();
  });

  beforeEach(function () {
    cy.login(user);
    cy.visitAndWaitUntilPageLoad(`apps/asset-properties/index.html#/`);
  });

  // Verify that property widget created by an admin user can be viewed by other user with read permission(roleId 1 is used to assign read permission by setting the Inventory roles as Reader).
  // As user do not have inventory permission, add propertywidget button should be disabled.
  // With only read permission user cannot perform any operation on the widget.
  it('TC_Asset_Properties_Widget_Permissions_001', () => {
    cy.get(asset_properties_widget_elements.widgetDashboardAddWidgetButton).should('be.disabled');
    cy.get(cardTitleElement).should('contain.text', asset1);
    cy.get('[data-cy="asset-properties-edit-icon"]').should('be.disabled');
  });

  // Verify that widget created by an admin user can be view/update/delete by other user(roleId 2 is used to assign change permission by setting the Inventory roles as Manager).
  // As user do not have inventory permission, add widget button should be disabled.

  // it('TC_Asset_Properties_Widget_Permissions_002', () => {
  //   cy.get(asset_properties_widget_elements.widgetDashboardAddWidgetButton).should('be.disabled');
  //   cy.get(cardTitleElement).should('contain.text', asset2);
  //   // cy.get('[data-cy="asset-properties-edit-icon"]').should('be.enabled');
  // });

  after(function () {
    cy.logout();
    cy.login();
    cy.apiDeleteAssets();
    cy.cleanup();
    cy.deleteUser(user);
    cy.visitAndWaitUntilPageLoad(`apps/asset-properties/index.html#/`);
    cy.deleteWidgetInstances([asset1, asset2]);
  });
});
