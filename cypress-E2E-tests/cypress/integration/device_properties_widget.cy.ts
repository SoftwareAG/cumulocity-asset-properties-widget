// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
import asset_properties_widget_elements from "../support/page_objects/asset_properties_widget_elements";

describe("Device properties widget", function () {
  const url = "apps/sag-pkg-asset-properties-widget/index.html#/";

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
    const asset = "Amazon";
    const device = "Device1";
    before(function () {
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
      cy.login();
      cy.createAssetTypesAndPropertyForBuildingHierarchy();
      cy.apiCreateAssetModel(groupObject, [
        { label: "Color", isRequired: "false" },
      ]);
      cy.createDevice("Device1");
      cy.apiCreateSimpleAsset([
        {
          type: "group",
          icon: {
            name: "",
            category: "",
          },
          name: asset,
          c8y_IsAsset: {},
          c8y_IsDeviceGroup: {},
        },
      ]);
      cy.apiAssignDevice(["Device1"], asset);
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
      cy.wait('@childAdditionCall').its("response.statusCode").should("eq", 200);
      cy.get(asset_properties_widget_elements.addPropertyButton)
        .should("be.enabled")
        .click();
      verifyThePropertyList(properties);
    });

    // Verify if the user selects a device which is assigned to an asset,for that device if the user clicks on add property,only device related properties should be displayed. 
    // Custom properties for that asset should not be shown.
    it("TC_Device_Properties_Widget_004", () => {
      const assetProperty = 'Color';
      navigateToSelectPropertiesWindow(device);
      cy.get(`#modal-body div[title='${assetProperty}`).should('not.exist');
    });

    after(function () {
      cy.cleanup();
      cy.deleteAllDevices();
    });
  });
});
