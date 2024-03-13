// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
import asset_properties_widget_elements from '../support/page_objects/asset_properties_widget_elements';

describe('Device properties widget', function () {
  const url = 'apps/sag-pkg-asset-properties-widget/index.html#/';
  const asset = 'Amazon';
  const device = 'Device1';
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
  const assetObject = {
    type: 'group',
    icon: {
      name: '',
      category: ''
    },
    name: asset,
    c8y_IsAsset: {},
    c8y_IsDeviceGroup: {}
  };

  // This function is used to navigate to the select properties window for the selected asset or device.
  function navigateToSelectPropertiesWindow(label: string, targetIndex?: number) {
    if (targetIndex) {
      cy.chooseAssetOrDevice(label, targetIndex);
    } else {
      cy.chooseAssetOrDevice(label);
    }
    cy.get(asset_properties_widget_elements.addPropertyButton).should('be.enabled').click();
  }

  context('Generic', function () {
    before(function () {
      cy.login();
      cy.createAssetTypesAndPropertyForBuildingHierarchy();
      cy.apiCreateAssetModel(groupObject, [{ label: 'Color', isRequired: 'false' }]);
      cy.createDevice(device);
      cy.apiCreateSimpleAsset([assetObject]);
      cy.apiAssignDevice([device], asset);
    });

    beforeEach(function () {
      cy.login();
      cy.visitAndWaitUntilPageLoad(url);
      cy.get(asset_properties_widget_elements.addWidgetButton).click();
      cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
      cy.clickOnAsset(asset);
    });

    function verifyThePropertyList(properties: string[]) {
      for (let i = 0; i < properties.length; i++) {
        const label = `#modal-body div[title='${properties[i]}']`;
        cy.get(label).scrollIntoView();
        cy.get(label).should('be.visible');
      }
    }

    // User should be able to see devices assigned to a asset selected under groups tab.
    // User should be able see all the default properties configured for the device on click of add property
    it('TC_Device_Properties_Widget_001', () => {
      const properties = [
        'Name',
        'ID',
        'Asset model',
        'Notes',
        'Owner',
        'Last updated',
        'Alarm count today',
        'Alarm count 3 months',
        'Event count today',
        'Event count 3 months',
        'Last measurement',
        'Number of child devices',
        'Number of child assets',
        'Last device message',
        'Configuration snapshot',
        'Active alarms status',
        'Address',
        'Agent',
        'Availability',
        'Connection',
        'Communication mode',
        'Firmware',
        'Hardware',
        'LPWAN device',
        'Mobile',
        'Position',
        'Required availability',
        'Software',
        'Network'
      ];
      cy.get(`button p[title='${device}']`).should('be.visible');
      navigateToSelectPropertiesWindow(device);
      verifyThePropertyList(properties);
    });

    // Verify that the select button is disabled when the property is not selected in select property window.
    // User should be able to click on multiple checkboxes(properties) and verify that the select button gets enabled.
    it('TC_Device_Properties_Widget_002', () => {
      const properties = ['Alarm count today', 'Last measurement'];
      navigateToSelectPropertiesWindow(device);
      cy.get(asset_properties_widget_elements.selectButton).should('be.disabled');
      for (let i = 0; i < properties.length; i++) {
        cy.selectProperty(properties[i]);
      }
      cy.get(asset_properties_widget_elements.selectButton).should('be.enabled');
    });

    // Verify that the user can see both asset properties and some device-related properties for assets.
    it('TC_Device_Properties_Widget_003', () => {
      const properties = [
        'Alarm count today',
        'Alarm count 3 months',
        'Event count today',
        'Event count 3 months',
        'Last measurement',
        'Number of child devices',
        'Number of child assets',
        'Last device message',
        'Configuration snapshot',
        'Color'
      ];
      cy.get(asset_properties_widget_elements.backButton).should('be.visible').click();
      cy.intercept(
        'inventory/managedObjects/**/childAdditions?pageSize=2000&query=%24filter%3D(has(%27c8y_IsAssetProperty%27))'
      ).as('childAdditionCall');
      cy.chooseAssetOrDevice(asset);
      cy.wait('@childAdditionCall').its('response.statusCode').should('eq', 200);
      cy.get(asset_properties_widget_elements.addPropertyButton).should('be.enabled').click();
      verifyThePropertyList(properties);
    });

    // Verify if the user selects a device which is assigned to an asset,for that device if the user clicks on add property,only device related properties should be displayed.
    // Custom properties for that asset should not be shown.
    it('TC_Device_Properties_Widget_004', () => {
      const assetProperty = 'Color';
      navigateToSelectPropertiesWindow(device);
      cy.get(`#modal-body div[title='${assetProperty}`).should('not.exist');
    });

    after(function () {
      cy.visitAndWaitUntilPageLoad('apps/digital-twin-manager/index.html#/home');
      cy.cleanup();
      cy.deleteAllDevices();
    });
  });

  context('Alarms and Events', { testIsolation: false }, function () {
    const properties = [
      'Alarm count today',
      'Alarm count 3 months',
      'Event count today',
      'Event count 3 months',
      'Active alarms status'
    ];
    const alarmRequest1 = [
      {
        deviceName: 'Device1',
        text: 'Device is out for maintanance',
        severity: 'CRITICAL',
        status: 'ACTIVE',
        type: 'DeviceAlarm',
        pastDate: {
          month: 2,
          day: 15
        }
      },
      {
        deviceName: 'Device1',
        text: 'Device Running for more than standard time',
        severity: 'MINOR',
        status: 'ACTIVE',
        type: 'DeviceAlarm'
      },
      {
        deviceName: 'Device1',
        text: 'Device Running for more than standard time',
        severity: 'MAJOR',
        status: 'ACTIVE',
        type: 'DeviceAlarm',
        pastDate: {
          month: 3,
          day: 15
        }
      }
    ];

    const alarmRequest2 = [
      {
        deviceName: 'Device1',
        text: 'Device Running for more than standard time',
        severity: 'MINOR',
        status: 'ACTIVE',
        type: 'type1'
      },
      {
        deviceName: 'Device1',
        text: 'Device Running for more than standard time',
        severity: 'MAJOR',
        status: 'ACTIVE',
        type: 'type2',
        pastDate: {
          month: 3,
          day: 15
        }
      },
      {
        deviceName: 'Device1',
        text: 'Device Running for more than standard time',
        severity: 'WARNING',
        status: 'ACKNOWLEDGE',
        type: 'type3'
      }
    ];

    const events = [
      {
        deviceName: 'Device1',
        type: 'DeviceAlarm',
        text: 'sensor was triggered'
      },
      {
        deviceName: 'Device1',
        type: 'DeviceAlarm',
        text: 'Alarm was triggered',
        pastDate: {
          month: 3,
          day: 15
        }
      },
      {
        deviceName: 'Device1',
        type: 'DeviceAlarm',
        text: 'Critical Alarm was triggered',
        pastDate: {
          month: 2,
          day: 15
        }
      }
    ];

    before(function () {
      cy.login();
      cy.apiCreateAssetModel(groupObject);
      cy.createDevice(device, { month: 4, day: 15 });
      cy.apiCreateSimpleAsset([assetObject]);
      cy.apiAssignDevice([device], asset);
      for (let i = 0; i < alarmRequest1.length; i++) {
        cy.createNewAlarm(alarmRequest1[i]);
        cy.createNewAlarm(alarmRequest2[i]);
        cy.createEvent(events[i]);
      }
      cy.visitAndWaitUntilPageLoad(url);
      cy.get(asset_properties_widget_elements.addWidgetButton).click();
      cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
      cy.clickOnAsset(asset);
      cy.chooseAssetOrDevice(device);
      for (let i = 0; i < properties.length - 1; i++) {
        cy.get(asset_properties_widget_elements.addPropertyButton).should('be.enabled').click();
        cy.selectProperty(properties[i]);
        cy.get(asset_properties_widget_elements.selectButton).click();
        cy.get(asset_properties_widget_elements.assetPropertySlectorLabelTextBox)
          .should('be.visible')
          .type('DeviceAlarm');
        cy.get(asset_properties_widget_elements.saveButton).eq(1).click();
      }
      cy.get(asset_properties_widget_elements.addPropertyButton).should('be.enabled').click();
      cy.selectProperty(properties[4]);
      cy.get(asset_properties_widget_elements.selectButton).click();
      cy.get(asset_properties_widget_elements.saveButton).eq(0).should('be.visible').click();
      cy.validatePropertyValue('Name', device);
    });

    // Ensure users can set the 'Alarm count today' and also validate the data.
    // Send two alarms,one for the previous day and other for current day,Verify that only the current day count is shown on view.
    it('TC_Device_Properties_Widget_005', () => {
      cy.validatePropertyValue('Alarm count today', '1');
    });

    // Verify that 'Alarm count today' field will be disabled on view.
    it('TC_Device_Properties_Widget_006', () => {
      cy.get("p[title='Alarm count today']~button").should('not.exist');
    });

    // Ensure users can set the 'AlarmCount3Months ' and also validate the data.
    // Attempt to configure 'alarmCount3Months' with months older than 4 months. Only 3  months data should  be displayed on UI.
    it('TC_Device_Properties_Widget_007', () => {
      cy.validatePropertyValue('Alarm count 3 months', '1');
    });

    // Verify that 'AlarmCount3Months' field will be disabled on view.
    it('TC_Device_Properties_Widget_008', () => {
      cy.get("p[title='Alarm count 3 months']~button").should('not.exist');
    });

    // Ensure users can set the 'Event count today' and also validate the data.
    // Send two Events,one for the previous day and other for current day,Verify that only the current day count is shown on view.
    it('TC_Device_Properties_Widget_009', () => {
      cy.validatePropertyValue('Event count today', '1');
    });

    // Verify that 'Event count today' field will be disabled on view.
    it('TC_Device_Properties_Widget_010', () => {
      cy.get("p[title='Event count today']~button").should('not.exist');
    });

    // Ensure users can set the 'Event Count 3Months ' and also validate the data.
    // Attempt to configure 'Event Count 3Months' with months older than 4 months. Only 3  months data should  be displayed on UI.
    it('TC_Device_Properties_Widget_011', () => {
      cy.validatePropertyValue('Event count 3 months', '2');
    });

    // Verify that 'Event Count 3Months' field will be disabled on view.
    it('TC_Device_Properties_Widget_012', () => {
      cy.get("p[title='Event count 3 months']~button").should('not.exist');
    });

    // Ensure users can set the 'Active alarms status' and also validate the data.
    it('TC_Device_Properties_Widget_013', () => {
      cy.validatePropertyValue(
        'Active alarms status',
        'Critical:1,Minor:1,Major:1,Warning:0',
        true
      );
    });

    // Verify that 'Active alarms status' field will be disabled on view.
    it('TC_Device_Properties_Widget_014', () => {
      cy.get("p[title='ctive alarms status']~button").should('not.exist');
    });

    after(function () {
      cy.deleteWidgetInstances([device]);
      cy.apiDeleteAssets();
      cy.cleanup();
      cy.deleteAllDevices();
    });
  });

  context('Last Measurements', function () {
    const last_measurement_str = 'Last measurement';
    const last_recent_measurement_str = 'Last measurement most recent';
    const flowDataPointLabel = 's7aFlow → F';
    const temperatureDataPointLabel = 's7aTemp → T';
    const flowLatestDataPointLabel = 's7aFlowLatest → Cubic';
    const max_active_data_points_message =
      'At maximum 1 active data points are allowed to be selected.';
    const min_active_data_points_message = 'At least 1 active data points must be selected.';

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

      cy.apiCreateSimpleAsset([assetObject]);
      for (let i = 1; i < 3; i++) {
        cy.createDevice(`Device${i}`);
        cy.apiAssignDevice([`Device${i}`], asset);
        createMeasurement(`Device${i}`, 's7aFlow', 'F', 'KL', 45);
        createMeasurement(`Device${i}`, 's7aTemp', 'T', 'K', 450);
      }
    });

    beforeEach(function () {
      cy.login();
      cy.visitAndWaitUntilPageLoad(url);
      cy.get(asset_properties_widget_elements.addWidgetButton).click();
      cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
      cy.clickOnAsset(asset);
      cy.get(`p[title='${device}']`).should('contains.text', device);
      cy.chooseAssetOrDevice(device);
    });

    // Function to add a data point configuration
    const addDataPointConfiguration = () => {
      cy.get(asset_properties_widget_elements.addPropertyButton).click();
      cy.selectProperty(last_measurement_str);
      cy.get(asset_properties_widget_elements.selectButton).click();
      cy.get('.card-title').should('have.text', 'Data points');
      chooseDeviceForDataPointConfiguration();
      cy.get('c8y-datapoint-selector-modal #modal-title').should(
        'contain.text',
        'Data point selector'
      );
      cy.chooseAssetOrDevice(device, 3);
      cy.addOrRmoveDataPoint(flowDataPointLabel, 'add');
      cy.get(asset_properties_widget_elements.addDataPointsButton).click();
      cy.get(`[title="${flowDataPointLabel}"]`).should('contains.text', flowDataPointLabel);
      cy.get(asset_properties_widget_elements.computedPropertyConfigSaveButton).click();
    };

    const chooseDeviceForDataPointConfiguration = () => {
      cy.intercept({ method: 'GET', url: '/inventory/managedObjects?**)' }).as(
        'assetselectionresponse'
      );
      cy.get(asset_properties_widget_elements.addDataPointConfigButton).click();
      cy.wait('@assetselectionresponse').its('response.statusCode').should('eq', 200);
      cy.clickOnAsset(asset, 1);
    };

    // On configuring last measurement property,user should be able to see computed property configuration window
    // User should be able to see "add data point "button and on click which would display will open up data point selector window.
    // on data point selector window user should be able to see all the data points and all the devices.
    // On selection of device,user should be able to see available data points.
    // User can select only one data point for a selected device.
    // User should get an error message "At maximum 1 active data points are allowed to be selected" when user selects multiple data point. Only one data point can be selected for a particular device.
    // Verify the presence of toggle buttons for each of the device. User must be able to toggle off and on to remove/add the data point.
    // Verify that the save button gets enabled after selecting only one data point.
    it('TC_Device_Property_Measurement_015-1', () => {
      addDataPointConfiguration();
      cy.get(asset_properties_widget_elements.computedPropertySelectorConfigButton).click();
      chooseDeviceForDataPointConfiguration();
      cy.chooseAssetOrDevice(device, 3);
      cy.addOrRmoveDataPoint(temperatureDataPointLabel, 'add');
      cy.get(asset_properties_widget_elements.addDataPointsButton).click();
      cy.get(asset_properties_widget_elements.datapointSelectionList).should(
        'contains.text',
        max_active_data_points_message
      );
      cy.get(asset_properties_widget_elements.computedPropertyConfigSaveButton).should(
        'be.disabled'
      );
      cy.switchDataPointToggleButton(flowDataPointLabel);
      cy.switchDataPointToggleButton(temperatureDataPointLabel);
      cy.get(asset_properties_widget_elements.datapointSelectionList).should(
        'contains.text',
        min_active_data_points_message
      );
      cy.switchDataPointToggleButton(flowDataPointLabel);
      cy.get(asset_properties_widget_elements.datapointSelectionList).should(
        'not.contains.text',
        min_active_data_points_message
      );
      cy.get(asset_properties_widget_elements.computedPropertyConfigSaveButton).should(
        'be.enabled'
      );
      cy.get(asset_properties_widget_elements.datapointSelectionList).should(
        'not.contains.text',
        max_active_data_points_message
      );
      cy.get(asset_properties_widget_elements.computedPropertyConfigSaveButton).click();
    });

    // Verify the presence of '+' and '^' button icons.
    // On click of '+',user should be able to the respective data point. Once added,user should be able to see the added data point on selected data point preview window on the left.
    // Once added, '+' button icon must be changed to '-' button icon on click of which user should be able to remove the data point.Once removed,user should not be able to see the added data point on selected data point preview window on the left.
    // On click of '^', user should be able to expand the fragment series template.
    // Verify the presence of added fragment and series name,data point template dropdown and other details having label and unit information.
    // User should be able to select multiple data points at once.Once selected add data point button should be enabled.
    // User must be able to see multiple data fragments after selecting a device on data selector window.
    it('TC_Device_Property_Measurement_015-2', () => {
      cy.get(asset_properties_widget_elements.addPropertyButton).click();
      cy.selectProperty(last_measurement_str);
      cy.get(asset_properties_widget_elements.selectButton).click();
      chooseDeviceForDataPointConfiguration();
      cy.get('c8y-ui-empty-state')
        .should('contain.text', 'No data points to display.')
        .and('contain.text', 'No data points selected.');
      cy.chooseAssetOrDevice(device, 3);
      cy.get(asset_properties_widget_elements.dataPointAddButton).should('be.visible');
      cy.get(`[title="${flowDataPointLabel}"]`).should('contain.text', flowDataPointLabel);
      cy.get(asset_properties_widget_elements.addDataPointsButton).should('be.disabled');
      cy.addOrRmoveDataPoint(flowDataPointLabel, 'add');
      cy.addOrRmoveDataPoint(temperatureDataPointLabel, 'add');
      cy.get(asset_properties_widget_elements.addDataPointsButton).should('be.enabled');
      cy.get('[title="Selected data points"]')
        .parent('div')
        .should('contain.text', flowDataPointLabel)
        .and('contain.text', temperatureDataPointLabel);
      cy.get(asset_properties_widget_elements.dataPointRemoveButton).should('be.visible');
      cy.addOrRmoveDataPoint(flowDataPointLabel, 'remove');
      cy.expandOrCollapseDataPoint(flowDataPointLabel);
      cy.get('.expanded .data-point-details')
        .should('contain.text', 's7aFlow')
        .and('contain.text', 'F');
      cy.get(asset_properties_widget_elements.expandedInputNameLabel).clear();
      cy.get(asset_properties_widget_elements.expandedInputNameLabel).type(
        flowLatestDataPointLabel
      );
      cy.get(asset_properties_widget_elements.expandedDataPointLabel).should(
        'not.contain.text',
        flowDataPointLabel
      );
      cy.get(asset_properties_widget_elements.expandedDataPointLabel).should(
        'contain.text',
        flowLatestDataPointLabel
      );
      cy.expandOrCollapseDataPoint(flowLatestDataPointLabel);
    });

    // last measurement property can be added multiple times with same and different data point. User must be able to verify on UI.User should be able to edit the property label as well.
    // user should be able to see return type dropdown ,select one of the options and save it.
    it('TC_Device_Property_Measurement_015-3', () => {
      // Add first last measurement property configuration
      addDataPointConfiguration();

      // Verify that the label is editable and can be saved successfully.
      cy.get(asset_properties_widget_elements.assetPropertySelectorLabel)
        .eq(3)
        .type(' most recent');
      cy.get(asset_properties_widget_elements.assetPropertySelectorLabel)
        .eq(3)
        .invoke('val')
        .should('eq', last_recent_measurement_str);

      // Check if one last measurement property config button is present
      cy.get(asset_properties_widget_elements.computedPropertySelectorConfigButton).should(
        $elements => {
          expect($elements.length).to.equal(1);
        }
      );

      // Add second last measurement property configuration with same data point
      addDataPointConfiguration();

      // Check if two last measurement property config buttons are present
      cy.get(asset_properties_widget_elements.computedPropertySelectorConfigButton).should(
        $elements => {
          expect($elements.length).to.equal(2);
        }
      );

      // Add a third-last measurement property configuration with a different data point and select the return type as 'Value and unit'.
      cy.get(asset_properties_widget_elements.addPropertyButton).click();
      cy.selectProperty(last_measurement_str);
      cy.get(asset_properties_widget_elements.selectButton).click();
      chooseDeviceForDataPointConfiguration();
      cy.chooseAssetOrDevice(device, 3);
      cy.addOrRmoveDataPoint(temperatureDataPointLabel, 'add');
      cy.get(asset_properties_widget_elements.addDataPointsButton).click();
      cy.get(asset_properties_widget_elements.measurmentReturnTypeValueSelector).select(
        'Value and unit'
      );
      cy.get(asset_properties_widget_elements.computedPropertyConfigSaveButton).click();

      // Check if three last measurement property config buttons are present
      cy.get(asset_properties_widget_elements.computedPropertySelectorConfigButton).should(
        $elements => {
          expect($elements.length).to.equal(3);
        }
      );
      cy.get(asset_properties_widget_elements.widgetSaveButton).click();
      cy.validatePropertyValue(last_recent_measurement_str, '45');
      cy.validatePropertyValue(last_measurement_str, '45');
      cy.validatePropertyValue(last_measurement_str, '450 K');
    });

    after(function () {
      cy.deleteCard();
      cy.deleteAllDevices();
      cy.apiDeleteAssets();
      cy.cleanup();
    });
  });

  context('Child Assets/Devices', function () {
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
      const unassignedDevice = 'div p[title="Unassigned devices"]';
      cy.login();
      cy.visitAndWaitUntilPageLoad(url);
      cy.get(asset_properties_widget_elements.addWidgetButton).click();
      cy.get(asset_properties_widget_elements.cardElement).eq(0).click();
      cy.intercept({
        method: 'GET',
        url: '**/inventory/managedObjects?**'
      }).as('loadDevices');
      cy.get(unassignedDevice).click();
      cy.wait('@loadDevices').its('response.statusCode').should('eq', 200);
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
      cy.get('p[title="Network"]').scrollIntoView();
      cy.get('p[title="Network"]').should('be.visible');
      cy.get('label[title="DHCP"]').should('be.visible');
      cy.get('label[title="LAN"]').should('be.visible');
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
    });
  });
});
