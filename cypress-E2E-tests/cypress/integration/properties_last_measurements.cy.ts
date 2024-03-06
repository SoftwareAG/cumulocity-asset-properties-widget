import asset_properties_widget_elements from 'cypress/support/page_objects/asset_properties_widget_elements';

const propWidgetURL = 'apps/sag-pkg-asset-properties-widget/index.html#/';
const returnTypeFieldSelector = '#returnTypeField';
const expandedDataPointLabel = '.expanded .data-point-label';
const expandedInputNameLabel = '.expanded input[name="label"]';
const datapoint_selection_list = 'c8y-datapoint-selection-list';
const last_measurement_str = 'Last measurement';
const last_recent_measurement_str = 'Last measurement most recent'
const flowDataPointLabel = 's7aFlow → F';
const temperatureDataPointLabel = 's7aTemp → T';
const flowLatestDataPointLabel = 's7aFlowLatest → Cubic';
const assetPropertySelectorLabel = '[data-cy=asset-property-selector-label]';
const deviceName = 'Test-device-1';
const assetName = 'Test Asset';
const addDataPointsButton = '[title="Add data points"] ';
const computedPropertyConfigSaveButton = '[data-cy="computed-property-config-save-button"]';
const selector_button_computed_property_config = '[data-cy="asset-property-selector-config-computed-property-button"]';
const addDataPointConfigButton = '.card-footer > .btn';
const max_active_data_points_message = 'At maximum 1 active data points are allowed to be selected.';
const min_active_data_points_message= 'At least 1 active data points must be selected.';

describe('Asset Properties Widget: Integration tests', function () {
    before(function () {
      cy.login();
      function createMeasurement(deviceName, fragment, series, unit, value) {
        const requestBody = {
            deviceName: deviceName,
            fragment: fragment,
            series: series,
            unit: unit,
            value: value
        };
        cy.createMeasurement(requestBody);
      }
      const assetObject = [
        {
          type: 'building',
          icon: {
            name: '',
            category: ''
          },
          name: assetName,
          c8y_IsAsset: {},
          c8y_IsDeviceGroup: {}
        }
      ];
      cy.apiCreateSimpleAsset(assetObject);
      for (let i = 1; i < 3; i++) {
        cy.createDevice(`Test-device-${i}`);
        cy.apiAssignDevice([`Test-device-${i}`],assetName);
        createMeasurement(`Test-device-${i}`, 's7aFlow', 'F', 'KL', 45);
        createMeasurement(`Test-device-${i}`, 's7aTemp', 'T', 'K', 450);
      }
    });

    beforeEach(function () {
      cy.login();
      cy.visitAndWaitUntilPageLoad(propWidgetURL);
      cy.get(asset_properties_widget_elements.addWidgetButton).click();
      cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
    });

    // Function to add a data point configuration
    const addDataPointConfiguration = () => {
      cy.get(asset_properties_widget_elements.addPropertyButton).click();
      cy.selectProperty(last_measurement_str);
      cy.get(asset_properties_widget_elements.selectButton).click();
      cy.get('.card-title').should('have.text', 'Data points');
      cy.intercept({ method: 'GET', url: '/inventory/managedObjects?**)' }).as(
        'assetselectionresponse'
      );
      cy.get(addDataPointConfigButton).click();
      cy.wait('@assetselectionresponse')
        .its('response.statusCode')
        .should('eq', 200);
      cy.clickOnAsset(assetName,1);
      cy.get('c8y-datapoint-selector-modal #modal-title').should('contain.text','Data point selector');
      cy.chooseAssetOrDevice(deviceName,3);
      cy.addOrRmoveDataPoint(flowDataPointLabel, 'add');
      cy.get(addDataPointsButton).click();
      cy.get(`[title="${flowDataPointLabel}"]`).should('contains.text', flowDataPointLabel);
      cy.get(computedPropertyConfigSaveButton).click();
    };

    // On configuring last measurement property,user should be able to see computed property configuration window
    // User should be able to see "add data point "button and on click which would display will open up data point selector window.
    // on data point selector window user should be able to see all the data points and all the devices.
    // On selection of device,user should be able to see available data points.
    // User can select only one data point for a selected device.
    // User should get an error message "At maximum 1 active data points are allowed to be selected" when user selects multiple data point. Only one data point can be selected for a particular device.
    // Verify the presence of toggle buttons for each of the device. User must be able to toggle off and on to remove/add the data point.
    // Verify that the save button gets enabled after selecting only one data point.
    it('DevicePropertyMeasurement_TC_015-1', () => {
      cy.get(`div[title="Groups > ${assetName}"]`).click();
      cy.get(`p[title='${deviceName}']`).should('contains.text', deviceName);
      cy.chooseAssetOrDevice(deviceName);
      addDataPointConfiguration();
      cy.get(selector_button_computed_property_config).click();
      cy.intercept({ method: 'GET', url: '/inventory/managedObjects?**)' }).as(
        'assetselectionresponse'
      );
      cy.get(addDataPointConfigButton).click();
      cy.wait('@assetselectionresponse')
        .its('response.statusCode')
        .should('eq', 200);
      cy.clickOnAsset(assetName,1);
      cy.chooseAssetOrDevice(deviceName,3);
      cy.addOrRmoveDataPoint(temperatureDataPointLabel, 'add');
      cy.get(addDataPointsButton).click();
      cy.get(datapoint_selection_list).should('contains.text', max_active_data_points_message);
      cy.get(computedPropertyConfigSaveButton).should('be.disabled');
      cy.switchDataPointToggleButton(flowDataPointLabel);
      cy.switchDataPointToggleButton(temperatureDataPointLabel);
      cy.get(datapoint_selection_list).should('contains.text', min_active_data_points_message);
      cy.switchDataPointToggleButton(flowDataPointLabel);
      cy.get(datapoint_selection_list).should('not.contains.text', min_active_data_points_message);
      cy.get(computedPropertyConfigSaveButton).should('be.enabled');
      cy.get(datapoint_selection_list).should('not.contains.text', max_active_data_points_message);
      cy.get(computedPropertyConfigSaveButton).click();
    });

    // Verify the presence of '+' and '^' button icons.
    // On click of '+',user should be able to the respective data point. Once added,user should be able to see the added data point on selected data point preview window on the left.
    // Once added, '+' button icon must be changed to '-' button icon on click of which user should be able to remove the data point.Once removed,user should not be able to see the added data point on selected data point preview window on the left.
    // On click of '^', user should be able to expand the fragment series template.
    // Verify the presence of added fragment and series name,data point template dropdown and other details having label and unit information.
    // User should be able to select multiple data points at once.Once selected add data point button should be enabled.
    // User must be able to see multiple data fragments after selecting a device on data selector window.
    it('DevicePropertyMeasurement_TC_015-2', () => {
      cy.get(`div[title="Groups > ${assetName}"]`).click();
      cy.get(`p[title='${deviceName}']`).should('contains.text', deviceName);
      cy.chooseAssetOrDevice(deviceName);
      cy.get(asset_properties_widget_elements.addPropertyButton).click();
      cy.selectProperty(last_measurement_str);
      cy.get(asset_properties_widget_elements.selectButton).click();
      cy.intercept({ method: 'GET', url: '/inventory/managedObjects?**)' }).as(
        'assetselectionresponse'
      );
      cy.get(addDataPointConfigButton).click();
      cy.wait('@assetselectionresponse')
        .its('response.statusCode')
        .should('eq', 200);
      cy.clickOnAsset(assetName,1);
      cy.get('c8y-ui-empty-state')
        .should('contain.text', 'No data points to display.')
        .and('contain.text', 'No data points selected.');
      cy.chooseAssetOrDevice(deviceName,3);
      cy.get('button i[c8yicon="plus-circle"]').should('be.visible');
      cy.get(`[title="${flowDataPointLabel}"]`).should('contain.text', flowDataPointLabel);
      cy.get(addDataPointsButton).should('be.disabled');
      cy.addOrRmoveDataPoint(flowDataPointLabel, 'add');
      cy.addOrRmoveDataPoint(temperatureDataPointLabel, 'add');
      cy.get(addDataPointsButton).should('be.enabled');
      cy.get('[title="Selected data points"]').parent('div').should('contain.text',flowDataPointLabel).and('contain.text',temperatureDataPointLabel);
      cy.get('button i[c8yicon="minus-circle"]').should('be.visible');
      cy.addOrRmoveDataPoint(flowDataPointLabel, 'remove');
      cy.expandOrCollapseDataPoint(flowDataPointLabel);
      cy.get('.expanded .data-point-details')
        .should('contain.text', 's7aFlow')
        .and('contain.text', 'F');
      cy.get(expandedInputNameLabel)
        .clear();
      cy.get(expandedInputNameLabel).type(flowLatestDataPointLabel);
      cy.get(expandedDataPointLabel).should('not.contain.text', flowDataPointLabel);
      cy.get(expandedDataPointLabel).should('contain.text', flowLatestDataPointLabel);
      cy.expandOrCollapseDataPoint(flowLatestDataPointLabel);
    });

    // last measurement property can be added multiple times with same and different data point. User must be able to verify on UI.User should be able to edit the property label as well.
    // user should be able to see return type dropdown ,select one of the options and save it.
    it('DevicePropertyMeasurement_TC_015-3', () => {
      cy.get(`div[title="Groups > ${assetName}"]`).click();
      cy.chooseAssetOrDevice(deviceName);


      // Add first last measurement property configuration
      addDataPointConfiguration();

      // Verify that the label is editable and can be saved successfully.
      cy.get(assetPropertySelectorLabel).eq(3).type(' most recent');
      cy.get(assetPropertySelectorLabel).eq(3).invoke('val').should('eq', last_recent_measurement_str);

      // Check if one last measurement property config button is present
      cy.get(selector_button_computed_property_config).should(($elements) => {
        expect($elements.length).to.equal(1);
      });

      // Add second last measurement property configuration with same data point
      addDataPointConfiguration();

      // Check if two last measurement property config buttons are present
      cy.get(selector_button_computed_property_config).should(($elements) => {
        expect($elements.length).to.equal(2);
      });

      // Add a third-last measurement property configuration with a different data point and select the return type as 'Value and unit'.
      cy.get(asset_properties_widget_elements.addPropertyButton).click();
      cy.selectProperty(last_measurement_str);
      cy.get(asset_properties_widget_elements.selectButton).click();
      cy.intercept({ method: 'GET', url: '/inventory/managedObjects?**)' }).as('assetselectionresponse');
      cy.get(addDataPointConfigButton).click();
      cy.wait('@assetselectionresponse').its('response.statusCode').should('eq', 200);
      cy.clickOnAsset(assetName, 1);
      cy.chooseAssetOrDevice(deviceName, 3);
      cy.addOrRmoveDataPoint(temperatureDataPointLabel, 'add');
      cy.get(addDataPointsButton).click();
      cy.get(returnTypeFieldSelector).select('Value and unit');
      cy.get(computedPropertyConfigSaveButton).click();

      // Check if three last measurement property config buttons are present
      cy.get(selector_button_computed_property_config).should(($elements) => {
        expect($elements.length).to.equal(3);
      });
      cy.get('[data-cy="widget-config--save-widget"]').click();
      cy.get('c8y-asset-properties-view').should('contain.text', last_recent_measurement_str)
      .and('contain.text', last_measurement_str);
      cy.checkPropertyItemValueVisibility(last_recent_measurement_str, 45);
      cy.checkPropertyItemValueVisibility(last_measurement_str, 45);
      cy.checkPropertyItemValueVisibility(last_measurement_str, '450 K');
      cy.deleteCard();
    });

    after(function () {
      cy.deleteAllDevices();
      cy.apiDeleteAssets();
      cy.cleanup();
    });
  });