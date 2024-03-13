// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
import asset_properties_widget_elements from "../support/page_objects/asset_properties_widget_elements";

describe("Device properties widget", function () {
  const url = "apps/sag-pkg-asset-properties-widget/index.html#/";
  const asset = "Amazon";
  const device = "Device1";
  const groupObject = {
    label: "Group",
    name: "group",
    description: "",
    c8y_IsAssetType: {
      icon: {
        category: "",
        name: "",
      },
      properties: [],
      allowedAssetTypes: [],
      isNoneChildAssetsAllowed: "false",
    },
  };
  const assetObject = {
    type: "group",
    icon: {
      name: "",
      category: "",
    },
    name: asset,
    c8y_IsAsset: {},
    c8y_IsDeviceGroup: {},
  };

  // This function is used to navigate to the select properties window for the selected asset or device.
  function navigateToSelectPropertiesWindow(
    label: string,
    targetIndex?: number
  ) {
    if (targetIndex) {
      cy.chooseAssetOrDevice(label, targetIndex);
    } else {
      cy.chooseAssetOrDevice(label);
    }
    cy.get(asset_properties_widget_elements.addPropertyButton)
      .should("be.enabled")
      .click();
  }

  context("Generic", function () {
    before(function () {
      cy.login();
      cy.createAssetTypesAndPropertyForBuildingHierarchy();
      cy.apiCreateAssetModel(groupObject, [
        { label: "Color", isRequired: "false" },
      ]);
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
        cy.get(label).should("be.visible");
      }
    }

    // User should be able to see devices assigned to a asset selected under groups tab.
    // User should be able see all the default properties configured for the device on click of add property
    it("TC_Device_Properties_Widget_001", () => {
      const properties = [
        "Name",
        "ID",
        "Asset model",
        "Notes",
        "Owner",
        "Last updated",
        "Alarm count today",
        "Alarm count 3 months",
        "Event count today",
        "Event count 3 months",
        "Last measurement",
        "Number of child devices",
        "Number of child assets",
        "Last device message",
        "Configuration snapshot",
        "Active alarms status",
        "Address",
        "Agent",
        "Availability",
        "Connection",
        "Communication mode",
        "Firmware",
        "Hardware",
        "LPWAN device",
        "Mobile",
        "Position",
        "Required availability",
        "Software",
        "Network",
      ];
      cy.get(`button p[title='${device}']`).should("be.visible");
      navigateToSelectPropertiesWindow(device);
      verifyThePropertyList(properties);
    });

    // Verify that the select button is disabled when the property is not selected in select property window.
    // User should be able to click on multiple checkboxes(properties) and verify that the select button gets enabled.
    it("TC_Device_Properties_Widget_002", () => {
      const properties = ["Alarm count today", "Last measurement"];
      navigateToSelectPropertiesWindow(device);
      cy.get(asset_properties_widget_elements.selectButton).should(
        "be.disabled"
      );
      for (let i = 0; i < properties.length; i++) {
        cy.selectProperty(properties[i]);
      }
      cy.get(asset_properties_widget_elements.selectButton).should(
        "be.enabled"
      );
    });

    // Verify that the user can see both asset properties and some device-related properties for assets.
    it("TC_Device_Properties_Widget_003", () => {
      const properties = [
        "Alarm count today",
        "Alarm count 3 months",
        "Event count today",
        "Event count 3 months",
        "Last measurement",
        "Number of child devices",
        "Number of child assets",
        "Last device message",
        "Configuration snapshot",
        "Color",
      ];
      cy.get(asset_properties_widget_elements.backButton)
        .should("be.visible")
        .click();
      cy.intercept(
        "inventory/managedObjects/**/childAdditions?pageSize=2000&query=%24filter%3D(has(%27c8y_IsAssetProperty%27))"
      ).as("childAdditionCall");
      cy.chooseAssetOrDevice(asset);
      cy.wait("@childAdditionCall")
        .its("response.statusCode")
        .should("eq", 200);
      cy.get(asset_properties_widget_elements.addPropertyButton)
        .should("be.enabled")
        .click();
      verifyThePropertyList(properties);
    });

    // Verify if the user selects a device which is assigned to an asset,for that device if the user clicks on add property,only device related properties should be displayed.
    // Custom properties for that asset should not be shown.
    it("TC_Device_Properties_Widget_004", () => {
      const assetProperty = "Color";
      navigateToSelectPropertiesWindow(device);
      cy.get(`#modal-body div[title='${assetProperty}`).should("not.exist");
    });

    after(function () {
      cy.visitAndWaitUntilPageLoad(
        "apps/digital-twin-manager/index.html#/home"
      );
      cy.cleanup();
      cy.deleteAllDevices();
    });
  });

  context("Alarms and Events", { testIsolation: false }, function () {
    const properties = [
      "Alarm count today",
      "Alarm count 3 months",
      "Event count today",
      "Event count 3 months",
      "Active alarms status"
    ];
    const alarmRequest1 = [
      {
        deviceName: "Device1",
        text: "Device is out for maintanance",
        severity: "CRITICAL",
        status: "ACTIVE",
        type: "DeviceAlarm",
        pastDate: {
          month: 2,
          day: 15,
        },
      },
      {
        deviceName: "Device1",
        text: "Device Running for more than standard time",
        severity: "MINOR",
        status: "ACTIVE",
        type: "DeviceAlarm"
      },
      {
        deviceName: "Device1",
        text: "Device Running for more than standard time",
        severity: "MAJOR",
        status: "ACTIVE",
        type: "DeviceAlarm",
        pastDate: {
          month: 3,
          day: 15,
        },
      },
    ];

    const alarmRequest2 = [ {
      deviceName: "Device1",
      text: "Device Running for more than standard time",
      severity: "MINOR",
      status: "ACTIVE",
      type: "type1"
    },
    {
      deviceName: "Device1",
      text: "Device Running for more than standard time",
      severity: "MAJOR",
      status: "ACTIVE",
      type: "type2",
      pastDate: {
        month: 3,
        day: 15,
      },
    },
    {
      deviceName: "Device1",
      text: "Device Running for more than standard time",
      severity: "WARNING",
      status: "ACKNOWLEDGE",
      type: "type3"
    }]

    const events = [
      {
        deviceName: "Device1",
        type: "DeviceAlarm",
        text: "sensor was triggered",
      },
      {
        deviceName: "Device1",
        type: "DeviceAlarm",
        text: "Alarm was triggered",
        pastDate: {
          month: 3,
          day: 15,
        },
      },
      {
        deviceName: "Device1",
        type: "DeviceAlarm",
        text: "Critical Alarm was triggered",
        pastDate: {
          month: 2,
          day: 15,
        },
      },
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
        cy.get(asset_properties_widget_elements.addPropertyButton)
          .should("be.enabled")
          .click();
        cy.selectProperty(properties[i]);
        cy.get(asset_properties_widget_elements.selectButton).click();
        cy.get(
          asset_properties_widget_elements.assetPropertySlectorLabelTextBox
        )
          .should("be.visible")
          .type("DeviceAlarm");
        cy.get(asset_properties_widget_elements.saveButton).eq(1).click();
      }
      cy.get(asset_properties_widget_elements.addPropertyButton)
        .should("be.enabled")
        .click();
      cy.selectProperty(properties[4]);
      cy.get(asset_properties_widget_elements.selectButton).click();
      cy.get(asset_properties_widget_elements.saveButton)
        .eq(0)
        .should("be.visible")
        .click();
      cy.validatePropertyValue("Name", device);
    });

    // Ensure users can set the 'Alarm count today' and also validate the data.
    // Send two alarms,one for the previous day and other for current day,Verify that only the current day count is shown on view.
    it("TC_Device_Properties_Widget_005", () => {
      cy.validatePropertyValue("Alarm count today", "1");
    });

    // Verify that 'Alarm count today' field will be disabled on view.
    it("TC_Device_Properties_Widget_006", () => {
      cy.get("p[title='Alarm count today']~button").should("not.exist");
    });

    // Ensure users can set the 'AlarmCount3Months ' and also validate the data.
    // Attempt to configure 'alarmCount3Months' with months older than 4 months. Only 3  months data should  be displayed on UI.
    it("TC_Device_Properties_Widget_007", () => {
      cy.validatePropertyValue("Alarm count 3 months", "1");
    });

    // Verify that 'AlarmCount3Months' field will be disabled on view.
    it("TC_Device_Properties_Widget_008", () => {
      cy.get("p[title='Alarm count 3 months']~button").should("not.exist");
    });

    // Ensure users can set the 'Event count today' and also validate the data.
    // Send two Events,one for the previous day and other for current day,Verify that only the current day count is shown on view.
    it("TC_Device_Properties_Widget_009", () => {
      cy.validatePropertyValue("Event count today", "1");
    });

    // Verify that 'Event count today' field will be disabled on view.
    it("TC_Device_Properties_Widget_010", () => {
      cy.get("p[title='Event count today']~button").should("not.exist");
    });

    // Ensure users can set the 'Event Count 3Months ' and also validate the data.
    // Attempt to configure 'Event Count 3Months' with months older than 4 months. Only 3  months data should  be displayed on UI.
    it("TC_Device_Properties_Widget_011", () => {
      cy.validatePropertyValue("Event count 3 months", "2");
    });

    // Verify that 'Event Count 3Months' field will be disabled on view.
    it("TC_Device_Properties_Widget_012", () => {
      cy.get("p[title='Event count 3 months']~button").should("not.exist");
    });

    // Ensure users can set the 'Active alarms status' and also validate the data.
    it("TC_Device_Properties_Widget_013", () => {
      cy.validatePropertyValue("Active alarms status", 'Critical:1,Minor:1,Major:1,Warning:0', true);
    });

    // Verify that 'Active alarms status' field will be disabled on view.
    it("TC_Device_Properties_Widget_014", () => {
      cy.get("p[title='ctive alarms status']~button").should("not.exist");
    });

    after(function () {
      cy.deleteWidgetInstances([device]);
      cy.cleanup();
      cy.deleteAllDevices();
    });
  });
});
