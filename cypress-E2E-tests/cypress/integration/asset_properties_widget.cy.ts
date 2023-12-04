// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
import asset_properties_widget_elements from '../support/page_objects/asset_properties_widget_elements';
import '@4tw/cypress-drag-drop';

const assetProperties = 'Asset Properties 2.0';
const title = 'Asset Properties Updated';
const titleTextElement = 'c8y-form-group > label';
const titleFieldId = '#widgetTitle';
const searchElement = "input[placeholder='Search for groups or assets…']";
const assetsTextElement = "p[title='Groups']";
const textElement = "c8y-asset-selector p[class*='text-12']";
const selectPropElement = "h3[id='modal-title']";
const backArrowElement = "i[c8yicon='angle-left']";
const editWidgetHeadetElement = "div[title='Edit widget']";
const cardTitleElement = 'c8y-dashboard-child-title';
const devices = ['Device1', 'Device2'];
const assetName = 'Test Asset2';
const url = 'apps/sag-pkg-asset-properties-widget/index.html#/';
const searchResultsElement = 'c8y-list-group span';
const strongTextElement = "c8y-ui-empty-state p[class*='text-medium']";
const checkboxElement = "input[type='checkbox']";
const assetNameElement = 'c8y-asset-properties-item > p';
const removePopupElement = 'h3 span';
const propFeildElement = "input[type='text']";
const saveElement = 'button[data-cy="asset-properties-save-button"]';
const cancelElement = 'button[data-cy="asset-properties-cancel-button"]';

const assetTitleName = '[title="check 1"] ';
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
const roomProperties = [{ label: 'Color', isRequired: 'false' }, { label: 'Location', isRequired: false }];
const marker = "div[class*='dlt-c8y-icon-marker']"; 
const mapZoomIn = "a[title='Zoom in']";
const mapZoomOut = "a[title='Zoom out']";
const mapFullScreen = "c8y-location button[title='Full screen']";
const moveBars = 'c8y-asset-property-selector td > i';
const map = "c8y-location c8y-map";
const moveBars1 = ":nth-child(1) > .cdk-drag-handle";
const moveBars3 = ":nth-child(3) > .cdk-drag-handle";
const labelElement = "td > input[class*='form-control']";
const lat="input[id='formly_5_number_lat_2']";
const lng="input[id='formly_5_number_lng_0']";
const alt="input[id='formly_5_number_alt_1']";

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
          c8y_IsDeviceGroup: {},
          c8y_Position: {
            lng: 77.6904,
            alt: null,
            lat: 12.9322
        }
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
    cy.visitAndWaitUntilPageLoad(url);
    cy.get(asset_properties_widget_elements.addWidgetButton).click();
    cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
  });

  // Verify the presence of configuration, Appearance and Select widget options on the top bar
  it('TC_Asset_Properties_Widget_config_001', () => {
    cy.get(asset_properties_widget_elements.selectWidgetButton).should('be.visible');
    cy.get(asset_properties_widget_elements.configurationButton).should('be.visible');
    cy.get(asset_properties_widget_elements.appearanceButton).should('be.visible');
  });

  // Verify the presence of Title feild and it is editable
  it('TC_Asset_Properties_Widget_config_002', () => {
    cy.get(titleTextElement).should('contain.text', 'Title');
    cy.get(titleFieldId).should('have.value', assetProperties);
    cy.get(titleFieldId).clear();
    cy.get(titleFieldId).type(title);
  });

  // Verify the presence of  Properties text, Add Prperty button, Show, Label, Key columns for the Properties section elements
  it('TC_Asset_Properties_Widget_config_003', () => {
    const propertiesTextElement = 'c8y-asset-property-selector div label';
    cy.get(propertiesTextElement).should('have.text', 'Properties ');
    cy.get(asset_properties_widget_elements.addPropertyButton);
    const columns = ['Show', 'Label', 'Key'];
    for (let i = 0; i < columns.length; i++) {
      cy.get('th label').eq(i).should('have.text', columns[i]);
    }
  });

  // Verify the presence of Properties section row elements
  it('TC_Asset_Properties_Widget_config_004', () => {
    const labels = ['Name', 'ID', 'Asset model'];
    const keys = ['name', 'id', 'type'];    
    for (let i = 0; i < labels.length; i++) {
      cy.get(moveBars).eq(i).should('be.visible');
      cy.get(checkboxElement).eq(i).should('be.visible');
      cy.get(labelElement).eq(i).should('have.value', labels[i]);
      cy.get('c8y-asset-property-selector td > span').eq(i).should('have.text', keys[i]);
    }
  });

  // Verify that removing the property reflects under Properties section
  it('TC_Asset_Properties_Widget_config_005', () => {
    const key = 'type';
    const keyElement = 'c8y-asset-property-selector td > span';
    cy.get(keyElement).eq(2).should('have.text', key);
    cy.get("button[data-cy='asset-property-selector-remove-property-button']").eq(2).click();
    cy.get(keyElement).eq(2).should('not.exist');
  });

  // Type in the title without selecting any asset, verify that clicking on save button should be disabled until asset is selected.
  it('TC_Asset_Properties_Widget_config_006', () => {
    cy.get(titleFieldId).clear();
    cy.get(titleFieldId).type(title);
    cy.get(asset_properties_widget_elements.saveButton).should('be.disabled');
    cy.selectAsset(assetName);
    cy.get(asset_properties_widget_elements.saveButton).should('be.enabled');
  });

  // Type in the title by selecting any asset, click on save and verify if the changes are getting reflected
  it('TC_Asset_Properties_Widget_config_007', () => {
    cy.get(titleFieldId).clear();
    cy.get(titleFieldId).type(title);
    cy.selectAsset(assetName);
    // added wait to resolve flakyness after selecting asset its takes few ms to enabled save button
    cy.wait(1000);
    cy.get(asset_properties_widget_elements.saveButton).click();
    cy.get(cardTitleElement).should('contain.text', title);
    cy.deleteCard();
  });

  // Verify the presence of cancel and save button.
  it('TC_Asset_Properties_Widget_config_008', () => {
    cy.get(asset_properties_widget_elements.cancelButton).should('be.visible');
    cy.get(asset_properties_widget_elements.saveButton).should('be.visible');
  });

    // Change the order of properties and click on cancel button,Verify that the changes are not being saved.
  it('TC_Asset_Properties_Widget_config_009', () => {
    cy.get(moveBars3).dragTo(moveBars1);
    cy.get(asset_properties_widget_elements.cancelButton).click();
    cy.get(asset_properties_widget_elements.addWidgetButton).click();
    cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
    cy.get(labelElement).eq(0).should('have.value', 'Name');
  });

  // Change the order of properties and click on save button,Verify if the order in which user has changed is properly getting displayed on widget cover.
  it('TC_Asset_Properties_Widget_config_010', () => {
    cy.selectAsset(assetName);
    cy.wait(1000);
    cy.get(moveBars3).dragTo(moveBars1);
    cy.wait(1000);
    cy.get(labelElement).eq(0).should('have.value', 'Asset model');
    cy.get(asset_properties_widget_elements.saveButton).click();
    cy.get(cardTitleElement).should('contain.text', assetProperties);
    cy.deleteCard();
  });

  // Check whether user is able to change the order of the properties by dragging it up down
  it('TC_Asset_Properties_Widget_config_011', () => {
    cy.get(moveBars3).dragTo(moveBars1);
    cy.get(moveBars1).dragTo(moveBars3);
    cy.get(labelElement).eq(0).should('have.value', 'Name');
  });

  // Verify the presence and functionality of add property button. On clicking of which should display a preview window with list of default properties
  it('TC_Asset_Properties_Widget_config_012', () => {
    const defaultProp = ['name', 'id', 'type', 'owner', 'lastUpdated'];
    cy.selectAsset(assetName);
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    cy.get(selectPropElement).should('have.text', 'Select property');
    for (let i = 0; i < defaultProp.length; i++) {
      cy.get(`div[title='${defaultProp[i]}']`).should('be.visible');
    }
  });

  // Verify that filtering the property in Select property works as expected
  it('TC_Asset_Properties_Widget_config_013', () => {
    const title = ['owner', 'name'];
    cy.selectAsset(assetName);
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    cy.get(asset_properties_widget_elements.filterProperties).type(title[0]);
    cy.get(`div[title='${title[0]}']`).should('be.visible');
    cy.get(`div[title='${title[1]}']`).should('not.exist');
  });

  // Verify the presence of Show, label and key column,cancel and select button
  it('TC_Asset_Properties_Widget_config_014', () => {
    cy.selectAsset(assetName);
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    cy.get(selectPropElement).should('have.text', 'Select property');
    cy.get(asset_properties_widget_elements.selectButton).should('be.visible');
    cy.get(asset_properties_widget_elements.propertyCancelButton).should('be.visible');
    const columnName = ['show', 'label', 'key'];
    cy.get("label[data-cy='asset-property-item-show-column']");
    for (let i = 0; i < columnName.length; i++) {
      cy.get(`label[data-cy='asset-property-item-${columnName[i]}-column']`).should('be.visible');
    }
  });

  // Verify User should be able to check and uncheck the required fields
  it('TC_Asset_Properties_Widget_config_015', () => {
    const ownerTitle = 'owner';
    cy.selectAsset(assetName);
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    cy.selectAssetProperty(ownerTitle);
    cy.unselectAssetProperty(ownerTitle);
  });

  // select button should be disabled until any field is checked
  it('TC_Asset_Properties_Widget_config_016', () => {
    cy.selectAsset(assetName);
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    cy.get(asset_properties_widget_elements.selectButton).should('be.disabled');
  });

  // Verify Select button should be disabled until any field is checked
  it('TC_Asset_Properties_Widget_config_017', () => {
    const title = 'owner';
    cy.selectAsset(assetName);
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    cy.get(asset_properties_widget_elements.selectButton).should('be.disabled');
    cy.selectAssetProperty(title);
    cy.get(asset_properties_widget_elements.selectButton).should('be.enabled');
  });

  // Verify that checking any field and click on select, user should be able to see the selected field in configuartion properties and save it.
  it('TC_Asset_Properties_Widget_config_018', () => {
    const title = 'owner';
    const keyElement = 'c8y-asset-property-selector > table > tbody > tr > td > span';
    cy.selectAsset(assetName);
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    cy.selectAssetProperty(title);
    cy.get(asset_properties_widget_elements.selectButton).click();
    cy.get(keyElement).eq(3).should('have.text', title);
    cy.get(asset_properties_widget_elements.saveButton).click();
    cy.get(cardTitleElement).should('contain.text', assetProperties);
    cy.deleteCard();
  });

  // Verify the presence of heading Asset Properties and description text
  it('TC_Asset_Properties_Widget_config_019', () => {
    const description = 'Editable form for asset properties widget';
    cy.contains(assetProperties);
    cy.contains(description);
  });

  // Verify the presence of text asset selection and search bar with message"search for group or asset".
  it('TC_Asset_Properties_Widget_config_020', () => {
    const selectionTextElement = 'c8y-asset-selector > div > p';
    cy.get(selectionTextElement).should('have.text', ' Asset selection ');
    cy.get(searchElement).should('be.visible');
    cy.get(assetsTextElement).should('have.text', ' Groups ');
  });

  // User should be able to select the asset.
  it('TC_Asset_Properties_Widget_config_021', () => {
    cy.selectAsset(assetName);
    cy.get(asset_properties_widget_elements.saveButton).should('be.enabled');
    cy.get(asset_properties_widget_elements.cancelButton).should('be.enabled');
  });

  // Verify that on click of an asset in Asset selection section it should navigate to the next screen displaying its subassets
  it('TC_Asset_Properties_Widget_config_022', () => {
    const assetName1 = 'check 1';
    const subassetName = 'check 2';
    cy.get(asset_properties_widget_elements.loadMoreButton).click();
    cy.get(`p[title='${assetName1}']`).click();
    cy.get(textElement).should('contains.text', ' Groups > ' + assetName1);
    cy.get(`p[title='${subassetName}']`).should('be.visible');
  });

  // Also user can navigate back  to respective parent asset using '<'.
  it('TC_Asset_Properties_Widget_config_023', () => {
    const assetName1 = 'check 1';
    const subassetName = 'check 2';
    cy.get(asset_properties_widget_elements.loadMoreButton).click();
    cy.get(`p[title='${assetName1}']`).click();
    cy.get(textElement).should('contains.text', 'Groups > ' + assetName1);
    cy.get(`p[title='${subassetName}']`).should('be.visible');
    cy.get(backArrowElement).click();
    cy.get(assetsTextElement).should('contain.text', 'Groups');
  });

  // User can select only one asset at a time.
  it('TC_Asset_Properties_Widget_config_024', () => {
    const assetName = 'check 1';
    const assetName1 = 'check 3';
    cy.get(asset_properties_widget_elements.loadMoreButton).click();
    cy.selectAsset(assetName);
    cy.selectAsset(assetName1);
    cy.get(`div[title='Groups > ${assetName}']`)
      .children('div[class*="checkbox"]')
      .children('label')
      .children('input[type="radio"]')
      .should('be.not.checked');
  });

  // User should be able to search sibling  assets on the search bar.Apply filter in assets search textbox and verify.
  it('TC_Asset_Properties_Widget_config_025', () => {
    const assetName = 'check 1';
    cy.get(searchElement).type(assetName);
    cy.get(searchResultsElement).should('have.text', 'Search results');
    cy.get(assetTitleName).should('contains.text', assetName).click();
    cy.get(asset_properties_widget_elements.radioButton).should('be.checked');
    cy.get(`p[title='${assetName}']`).should('contains.text', assetName);
    cy.get("button[title='Search']").click();
    cy.get(assetsTextElement).should('contain.text', 'Groups');
  });

  // On selecting the asset,user should be able to view all asset properties associated with that asset.Verify if checkboxes for properties are selected by default
  it('TC_Asset_Properties_Widget_config_026', () => {
    const prop = 'Color';
    const assetName = 'check 1';
    const subassetName = 'check 1 > check 2 > check 4';
    cy.get(searchElement).type(assetName);
    cy.get(assetTitleName).should('contains.text', assetName).click();
    cy.get('i[c8yicon="angle-right"]').click();
    cy.selectSubasset(subassetName);
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    // workaround for assettypes cache issue
    cy.selectAssetProperty('owner');
    cy.get(asset_properties_widget_elements.selectButton).click();
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    // workaround for assettypes cache issue
    cy.get(`div[title='${prop}']`).should('be.visible');
  });

  // Verfify the presence of load more button if there are more number of assets present in the application
  it('TC_Asset_Properties_Widget_config_027', () => {
    cy.get(asset_properties_widget_elements.loadMoreButton)
      .scrollIntoView()
      .should('be.visible')
      .click();
  });

  // Clearing the title field value should result in error
  it('TC_Asset_Properties_Widget_config_028', () => {
    cy.get(titleFieldId).clear();
    cy.get(searchElement).click();
    cy.get('c8y-messages').should('contain.text', 'This field is required.');
  });

  // Verify the search functionality works as expected when there are no matching records
  it('TC_Asset_Properties_Widget_config_029', () => {
    const assetName = 'eee';
    const smallTextElement = 'c8y-ui-empty-state div > small';
    cy.get(searchElement).type(assetName);
    cy.get(searchResultsElement).should('have.text', 'Search results');
    cy.get(strongTextElement).should('have.text', 'No match found.');
    cy.get(smallTextElement).should('have.text', ' Try to rephrase your search word. ');
  });

  // Verify that on click of an asset in Asset selection section it should navigate to the next screen displaying empty state message
  it('TC_Asset_Properties_Widget_config_030', () => {
    const assetName = 'check 3';
    const filterElement = "button[title='Apply filter']";
    cy.get(assetsTextElement).should('contain.text', 'Groups');
    cy.get(asset_properties_widget_elements.loadMoreButton).click();
    cy.get(`p[title='${assetName}']`).click();
    cy.get(textElement).should('contains.text', 'Groups > ' + assetName);
    cy.get(backArrowElement).should('be.visible');
    cy.get('input[placeholder="Filter this column…"]').click();
    cy.get(filterElement).should('be.visible');
    cy.get(strongTextElement).should('have.text', 'No results to display.');
    cy.get("c8y-ui-empty-state  p[class*='small']").should(
      'have.text',
      'The selected asset has no children.'
    );
  });

  // Verify that unchecking the property reflects under Properties section
  it('TC_Asset_Properties_Widget_config_031', () => {
    cy.get(checkboxElement).eq(0).should('be.checked').click();
    cy.get(checkboxElement).eq(0).should('not.be.checked').click();
  });

  // Verify that cancel button works as expected
  it('TC_Asset_Properties_Widget_config_032', () => {
    cy.get(asset_properties_widget_elements.cancelButton).click();
    cy.get(asset_properties_widget_elements.addWidgetButton).should('be.visible');
  });

  // Verify the presence of cancel and save button.
  it('TC_Asset_Properties_Widget_config_033', () => {
    cy.get(asset_properties_widget_elements.cancelButton).should('be.visible');
    cy.get(asset_properties_widget_elements.saveButton).should('be.visible');
  });

  // Asset property widget title can be duplicate
  it('TC_Asset_Properties_Widget_config_034', () => {
    cy.selectAssetAndSave(assetName);
    cy.get(asset_properties_widget_elements.widgetDashboardAddWidgetButton).click();
    cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
    cy.selectAssetAndSave(assetName);
    cy.deleteWidgetInstances([assetProperties, assetProperties]);
  });

    // If user does not select any property or unchecks all the properties and tries to click on save button,a warning error will be displayed which disappears once the asset and properties selected
    it('TC_Asset_Properties_Widget_config_035', () => {
    const configElement = 'c8y-asset-property-selector';
    const alertMessage = ' Add and select at least one property. ';
    const labels = ['Name', 'ID', 'Asset model'];
    for (let i = 0; i < labels.length; i++) {
      cy.get(checkboxElement).eq(i).should('be.visible').click();
    }
    cy.get(configElement).should('contain.text', alertMessage);
    cy.get(checkboxElement).eq(0).click();
    cy.selectAsset(assetName);
    cy.get(configElement).should('not.contain.text', alertMessage);
    });

  // Verify the presence "No widgets to display" meessage in the dashboard
  it('TC_Asset_Properties_Widget_view_001', () => {
    cy.get(asset_properties_widget_elements.cancelButton).click();
    const message = 'No widgets to display';
    cy.contains(message);
  });

  // Verify the presence of Name,ID and Type rows property fields.
  it('TC_Asset_Properties_Widget_view_002', () => {
    cy.selectAssetAndSave(assetName);
    cy.get(cardTitleElement).should('contain.text', assetProperties);
    cy.get("p[title='Name']").should('be.visible');
    cy.get("p[title='ID']").should('be.visible');
    cy.get("p[title='Asset model']").scrollIntoView().should('be.visible');
    cy.deleteCard();
  });

  // Verify the presence of settings symbol at the top. User should be able to see edit and remove option on clicking it.
  it('TC_Asset_Properties_Widget_view_003', () => {
    cy.selectAssetAndSave(assetName);
    cy.get(asset_properties_widget_elements.settingsButton).should('be.visible').click();
    cy.get(asset_properties_widget_elements.removeWidgetButton).should('be.visible');
    cy.get(asset_properties_widget_elements.editWidgetButton).should('be.visible');
    cy.get(asset_properties_widget_elements.settingsButton).click();
    cy.deleteCard();
  });

  // User should be able to navigate to configuation page on clicking of edit button.
  it('TC_Asset_Properties_Widget_view_004', () => {
    cy.selectAssetAndSave(assetName);
    cy.get(asset_properties_widget_elements.settingsButton).click();
    cy.get(asset_properties_widget_elements.editWidgetButton).click();
    cy.get(editWidgetHeadetElement).should('be.visible');
    cy.get(asset_properties_widget_elements.cancelButton).click();
    cy.deleteCard();
  });

  // Click on remove button, user will get and remove widget confirmation pop up. click on remove button verify the absence of widget.
  it('TC_Asset_Properties_Widget_view_005', () => {
    const messageElement = 'div[data-cy="prompt-alert"] > p';
    const message =
      'You are about to remove widget "Asset Properties 2.0" from your dashboard. Do you want to proceed?';
    cy.selectAssetAndSave(assetName);
    cy.get(asset_properties_widget_elements.settingsButton).click();
    cy.get(asset_properties_widget_elements.removeWidgetButton).click();
    cy.get(removePopupElement).should('have.text', 'Remove widget');
    cy.get(messageElement).should('have.text', message);
    cy.get(asset_properties_widget_elements.removeButton).should('be.visible').click();
    cy.contains('No widgets to display');
  });

  // Click on remove button, user will get and remove widget confirmation pop up. click on cancel button verify the presence of widget.
  it('TC_Asset_Properties_Widget_view_006', () => {
    cy.selectAssetAndSave(assetName);
    cy.get(asset_properties_widget_elements.settingsButton).click();
    cy.get(asset_properties_widget_elements.removeWidgetButton).click();
    cy.get(removePopupElement).should('have.text', 'Remove widget');
    cy.get(asset_properties_widget_elements.cancelButton).should('be.visible').click();
    cy.get(removePopupElement).should('not.exist');
    cy.get(cardTitleElement).should('contain.text', assetProperties);
    cy.deleteCard();
  });

  // User should be able to click on edit , do some changes and save it. Changes done should be reflected on view.Properties other than these can be edited and saved.
  it('TC_Asset_Properties_Widget_view_007', () => {
    cy.selectAssetAndSave(assetName);
    cy.get(assetNameElement).eq(0).should('contains.text', 'Test Asset2');
    cy.get(asset_properties_widget_elements.settingsButton).click();
    cy.get(asset_properties_widget_elements.editWidgetButton).click();
    cy.get(editWidgetHeadetElement).should('be.visible');
    cy.get(asset_properties_widget_elements.changeButton).should('be.visible').click();
    cy.selectAsset('Test Asset3');
    cy.get(asset_properties_widget_elements.saveButton).click();
    cy.get(assetNameElement).should('contains.text', 'Test Asset3');
    cy.deleteCard();
  });

  // Asset name should be editable
  it('TC_Asset_Properties_Widget_view_009', () => {
    cy.selectAssetAndSave(assetName);
    cy.clickPropertyEditButton('Name');
    cy.get(propFeildElement).clear();
    cy.get(propFeildElement).type('New Asset');
    cy.get(saveElement).click();
    cy.get(assetNameElement).should('contains.text', 'New Asset');
    cy.deleteCard();
  });

  // If the property 'Location' has values then map should be shown with a marker showing at the provided lat and long values.
  // Full screen button is shown on click of which the map opens in full screen.
  // The user will not be able to click on the map or drag the marker
  // The marker should be visible at the center of the map.
  it('TC_Asset_Properties_Widget_Location_001', () => {
    cy.selectAssetPropertyAndSave(assetName, 'c8y_Position');
    cy.get(assetNameElement).eq(4).should('contain.text', 77.6904);
    cy.get(assetNameElement).eq(5).should('contain.text', 'Undefined');
    cy.get(assetNameElement).eq(6).should('contain.text', 12.9322);
    cy.get(map).scrollIntoView().should('be.visible');
    cy.get(mapFullScreen).scrollIntoView().should('be.visible');
    cy.get(mapZoomIn).scrollIntoView().should('be.visible');
    cy.get(mapZoomOut).scrollIntoView().should('be.visible');
    cy.get(marker).scrollIntoView().should('be.visible');
    cy.get(map).should('not.be.enabled');
    cy.get(marker).should('not.be.enabled');
    // cy.get(mapFullScreen).scrollIntoView().trigger("click"); // works intermittently
    cy.deleteCard();
  });

    //  On click of Cancel the values should not get saved.
    it('TC_Asset_Properties_Widget_Location_002', () => {    
      cy.selectAssetPropertyAndSave(assetName, 'c8y_Position');
      cy.clickPropertyEditButton('Location');    
      cy.get(lng).should('contain.value', 77.6904);
      cy.get(lng).clear();
      cy.get(alt).should('contain.value', '');
      cy.get(alt).clear();
      cy.get(lat).should('contain.value', 12.9322);
      cy.get(lat).clear();
      cy.get(cancelElement).click();
      cy.get(assetNameElement).eq(4).should('contain.text', 77.6904);
      cy.get(assetNameElement).eq(5).should('contain.text', 'Undefined');
      cy.get(assetNameElement).eq(6).should('contain.text', 12.9322);
      cy.deleteCard();
    });


  // If the property 'Location' has values:
  // The values should be shown in respective fields.
  //  Map should be visible with a marker pointing at the provided location at the center.
  // Full screen button should be visible on click of which map opens full screen. 
  // If the values are changed manually in the fields the marker should automatically get updated.
  // On click of save the values should get updated.
  it('TC_Asset_Properties_Widget_Location_003', () => {
    const leafletMarker = "div[class*='leaflet-marker-icon']";
    cy.selectAssetPropertyAndSave(assetName, 'c8y_Position');
    cy.clickPropertyEditButton('Location');
    cy.get(leafletMarker).should('have.css', 'height', '12px')
    cy.get(leafletMarker).should('have.css', 'width', '12px')
    cy.get(lng).should('contain.value', 77.6904);
    cy.get(lng).clear();
    cy.get(alt).should('contain.value', '');
    cy.get(alt).clear();
    cy.get(lat).should('contain.value', 12.9322);
    cy.get(lat).clear();
    cy.get(map).scrollIntoView().should('be.visible');
    cy.get(mapFullScreen).scrollIntoView().should('be.visible');
    cy.get(mapZoomIn).scrollIntoView().should('be.visible');
    cy.get(mapZoomOut).scrollIntoView().should('be.visible');    
    //cy.get(marker).scrollIntoView().should('not.exist');
    cy.get(lng).type('60');
    cy.get(alt).type('10');
    cy.get(lat).type('15');
    cy.get(saveElement).click();
    cy.get(assetNameElement).eq(4).should('contain.text', 60);
    cy.get(assetNameElement).eq(5).should('contain.text', 10);
    cy.get(assetNameElement).eq(6).should('contain.text', 15);
    cy.deleteCard();
  });

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
    cy.visitAndWaitUntilPageLoad(url);
    cy.get(asset_properties_widget_elements.addWidgetButton).click();
    cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
    cy.get(titleFieldId).clear();
    cy.get(titleFieldId).type(asset1);
    cy.selectAssetPropertyAndSave(asset1, 'lastUpdated');
    cy.get(asset_properties_widget_elements.widgetDashboardAddWidgetButton).click();
    cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
    cy.get(titleFieldId).clear();
    cy.get(titleFieldId).type(asset2);
    cy.selectAssetPropertyAndSave(asset2, 'lastUpdated');
    cy.logout();
  });

  beforeEach(function () {
    cy.login(user);
    cy.visitAndWaitUntilPageLoad(url);
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

  it('TC_Asset_Properties_Widget_Permissions_002', () => {
    cy.get(asset_properties_widget_elements.widgetDashboardAddWidgetButton).should('be.disabled');
    cy.get(cardTitleElement).should('contain.text', asset2);
    cy.get("button[data-cy='asset-properties-edit-icon']").should('be.enabled');
  });

  after(function () {
    cy.logout();
    cy.login();
    cy.cleanup();
    cy.deleteUser(user);
    cy.visitAndWaitUntilPageLoad(url);
    cy.deleteWidgetInstances([asset1, asset2]);
  });
});
