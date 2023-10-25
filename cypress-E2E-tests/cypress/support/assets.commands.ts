import assets_page_elements from './page_objects/assets_page_elements';
import asset_types_page_elements from './page_objects/asset_types_page_elements';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * This command is being used to choose asset model during the creation of asset hierarchy.
       * @param assetTypeLabel Asset model label.
       * Usage: cy.chooseAssetType("Building");
       */
      chooseAssetType(assetTypeLabel: string): void;

      /**
       * This command is being used to create asset modles and custom properties for building hierarchy.
       * Note: Asset types and Custom properties are fixed.
       * Usage: cy.createAssetTypesAndPropertyForBuildingHierarchy();
       *
       */
      createAssetTypesAndPropertyForBuildingHierarchy(): void;

      /**
       * This command is being used to provide an input for the textfield present in asset hierarchy screen.
       * @param textFieldName Name of the text field.
       * @param input Specify the input.
       * @param index If you are adding multiple instances then specify it in terms of number.
       * Usage: cy.provideAnInputForTheTextFieldInAssetHierarchyScreen("Name", "Amazon", 2);
       */
      provideAnInputForTheTextFieldInAssetHierarchyScreen(
        textFieldName: string,
        input: string,
        index?: number
      ): void;

      /**
       * This command is being used to verify the presence of asset in subassets table.
       * @param assetName Specify the name of an asset.
       * @param page It is an optional parameter. If you are verifying it on subasset page then mention it as 'subasset'.
       * Usage: cy.verifyThePresenceOfAsset("assetName");
       */
      verifyThePresenceOfAsset(assetName: string, page?: string): void;

      /**
       * This command is being used to create a "Building" asset.
       * @param buildingName Specify the name of the building.
       * Note: hierarchy is getting created as per the following command "createAssetTypesAndPropertyForBuildingHierarchy()"
       * Usage: cy.createBuildingAsset("Amazon");
       */
      createBuildingAsset(buildingName: string): void;

      /**
       * This command is being used to delete an asset.
       * @param assetName Specify the name of an asset.
       * Usage: cy.deleteAsset("Amazon");
       */
      deleteAsset(assetName: string): void;

      /**
       * This command is being used to verify the absence of asset in asset grid.
       * @param assetName Specify the name of an asset.
       * Usage: cy.verifyTheAbsenceOfAsset("Amazon");
       */
      verifyTheAbsenceOfAsset(assetName: string): void;

      /**
       * This command is being used to navigate to subasset page.
       * @param assetName Name of the asset.
       * Usage: cy.navigateToAssetPageThroughSubAssetsTable("Amazon", 1);
       */
      navigateToAssetPageThroughSubAssetsTable(assetName: string): void;

      /**
       * This command is being used to verify simple asset property value in subasset page.
       * @param customPropertyName Name of an asset property.
       * @param customPropertyValue Property value.
       * Usage: cy.validateCustomPropertyValueOfAsset("Color", "Red");
       *
       */
      validateCustomPropertyValueOfAsset(
        customPropertyName: string,
        customPropertyValue: string
      ): void;

      /**
       * This command is being used to verify complex asset property value in subasset page.
       * @param customPropertyName Name of an asset property.
       * @param customPropertyValue Asset property values in key value pair.
       * Ex: {Building hieght": "200", Building color: "Red"}
       * Usage: cy.validateComplexCustomPropertyValueOfAsset("Building properties", complexProperties)
       */
      validateComplexCustomPropertyValueOfAsset(
        customPropertyName: string,
        customPropertyValue: object
      ): void;

      /**
       * Create an asset hierarchy with one child asset.
       * Note: Asset models are constant.
       * Usage: cy.createHierarchicalAssetModels();
       */
      createHierarchicalAssetModels(): void;

      /**
       * This command is being used to insert the search text to the golbal search field.
       * @param input Search text
       * Usage: cy.provideAnInputForAssetSearch('Amazon');
       */
      provideAnInputForAssetSearch(input: string): void;

      /**
       * This command is being used to verify the global search result.
       * @param assetName Name of the Asset
       * Usage: cy.verifyTheGlobalSearchResult('Amazon);
       */
      verifyTheGlobalSearchResult(assetName: string): void;

      /**
       * This command is being used to navigate to subassets page.
       * @param assetName Name of the asset
       * Usage: cy.navigateToSubassetPageThroughAssetTreeGrid('Building');
       */
      navigateToSubassetPageThroughAssetTreeGrid(assetName: string): void;

      /**
       * This command is being used to expand/collapse the asset hierarchy in asset tree view.
       * @param assetNames array of asset names
       * Usage: cy.expandOrCollapseAssetTreeViewNode(['Building']);
       */
      expandOrCollapseAssetTreeViewNode(assetNames: string[]);

      /**
       * This command is being used to delete all assets through API request.
       * Usage: cy.apiDeleteAssets();
       */
      apiDeleteAssets(): void;

      /**
       * This command is being used to select the devices in Assign device window.
       * @param deviceName Store the device names inside the variable in array format and pass the variable
       * @param option It is an optional parameter. if you are slecting the child device then mention it as "child".
       * Usage: cy.selectDevices(devicenames)
       */
      selectDevices(deviceName: string[], option?: string): void;

      /**
       * This command is being used to deselect the selected devices in Assign device window.
       * @param deviceName Store the device names inside the variable in array format and pass the variable.
       * Usage: cy.deselctDevices(devicenames);
       */
      deselectDevices(deviceName: string[]): void;

      /**
       * This command is being used the verify whether device is assigned or not.
       * @param location Specify the location (hierarchycreation/subassets)
       * @param deviceName Name of the device
       * Usage: cy.verifyThePresenceOfAssignedDevice('hierarchycreation', 'Device1')
       */
      verifyThePresenceOfAssignedDevice(location: string, deviceName: string): void;

      /**
       * This command is being used to serach the device in Assign device window.
       * @param deviceName Name of the device
       * @param option From where the device is geeting added(multilpe/subasset)
       * @param intance If you are adding multiple instances then specify the instence in terms of number(Ex:2)
       * Note:If you are adding single instances during hierarchy creation then no need to specify option & instance
       * Usage: cy.searchDevices('Device1', 'multiple', 2)
       */
      searchDevices(deviceName: string, option?: string, index?: number): void;

      /**
       * This command is being used to remove the added device during hierarchy creation
       * @param deviceName Name of the device
       * @param instance Specify the instance in terms of number
       * Usage: cy.removeDevice('Device1', 1);
       */
      removeDevice(deviceName: string, instance: number): void;

      /**
       * This command is being used to click on action button of the Asset
       * @param assetName Name of the asset
       * Usage: cy.clickOnActionButton('Building');
       */
      clickOnActionButton(assetName: string): void;

      /**
       * This command is being used to edit the Asset name or description.
       * @param option Specify the option (Name/Description)
       * @param input Specify the input
       * Usage: cy.editAssetNameOrDescription('Name', 'Building1');
       */
      editAssetNameOrDescription(option: string, input: string): void;

      /**
       * This command is being used to edit properties in subasset screen.
       * @param propertyName Name of the property
       * @param parameter You need to pass array of object EX: [[{key:'text', type:'text', value:'Red'}, {key:'number', type:'number', value:'42'}]
       * @param option save/cancel
       * Usage: cy.editCustomPropertyOfAnAsset('Complex Property', object, 'save');
       */
      editCustomPropertyOfAnAsset(propertyName: string, parameter: object[], option: string): void;

      /**
       * This command is being used to unassign the device in subasset screen
       * @param deviceName Name of the device
       * Usage: cy.unassignDevice('Device1);
       */
      unassignDevice(deviceName: string): void;

      /**
       * This command is being used to check whether the asset type selected is visible during asset creation or during addition of child asset
       * @param title label of the asset type
       * Usage: cy.assetModelLabelVisible('Building);
       */
      assetModelLabelVisible(title: string): void;

      /**
       * This command is being verify the error is thrown for 'name' field in asset hierarchy screen.
       * @param errorMessage Error message shown for name field.
       * @param index If you are adding multiple instances then specify it in terms of number.
       * Usage: cy.provideAnInputForTheTextFieldInAssetHierarchyScreen("Name", "Amazon", 2);
       */
      verifyInvalidErrorForNameFieldInAsset(errorMessage: string, index?: number): void;

      /**
       * This command is being used to select the assets in Assets screen.
       * @param assets Store the asset names inside the variable in array format and pass the variable.
       * Usage: cy.selectAssets(assets);
       */
      selectAssets(assets: string[]): void;

      /**
       * This command is being used to select the file during hierarchy creation.
       * @param propertyName Name of the property.
       * @param fileName Name of the file with extension.
       * @param instance If you are adding multiple instances then specify the index otherwise it's an optional parameter.
       * Ex: If you are added 2 instances and you want to select a file for second instance then specify '2'.
       * Usage: cy.selectFileDuringHierarchyCreation('Simple_Property', 'Valid_file.csv', 2);
       */
      selectFileDuringHierarchyCreation(
        propertyName: string,
        fileName: string,
        instance?: number
      ): void;
    }
  }
}

Cypress.Commands.add('chooseAssetType', assetTypeLabel => {
  const assetTypes = "ng-dropdown-panel[aria-label='Options list']";
  cy.get('div.ng-placeholder')
    .contains('Choose Asset model')
    .parent('div')
    .children(asset_types_page_elements.selectAssetTypeDropdown)
    .should('be.visible')
    .click();
  cy.get(assetTypes)
    .contains(assetTypeLabel)
    .click();
});

Cypress.Commands.add('createAssetTypesAndPropertyForBuildingHierarchy', () => {
  const customPropertyObjects = [
    {
      name: 'color',
      description: '',
      label: 'Color',
      type: 'c8y_JsonSchema',
      c8y_IsAssetProperty: {},
      c8y_Global: {},
      c8y_JsonSchema: {
        type: 'object',
        properties: {
          color: {
            type: 'string',
            minLength: 2,
            maxLength: 3,
            minLengthValidate: true,
            maxLengthValidate: true
          }
        },
        required: [],
        key: 'color',
        title: 'Color'
      }
    },
    {
      name: 'length',
      description: '',
      label: 'Length',
      type: 'c8y_JsonSchema',
      c8y_IsAssetProperty: {},
      c8y_Global: {},
      c8y_JsonSchema: {
        type: 'object',
        properties: {
          length: {
            type: 'number',
            minimum: 2,
            maximum: 5,
            requiredMaximum: true,
            requiredMinimum: true
          }
        },
        required: [],
        key: 'length',
        title: 'Length'
      }
    }
  ];
  const roomObject = {
    label: 'Room',
    name: 'room',
    description: '',
    c8y_Global: {},
    c8y_IsAssetType: {
      icon: { category: '', name: '' },
      properties: [],
      allowedAssetTypes: [],
      isNoneChildAssetsAllowed: 'false'
    }
  };
  const floorObject = {
    label: 'Floor',
    name: 'floor',
    description: '',
    c8y_Global: {},
    c8y_IsAssetType: {
      icon: { category: '', name: '' },
      properties: [],
      allowedAssetTypes: [],
      isNoneChildAssetsAllowed: 'false'
    }
  };
  const buildingObject = {
    label: 'Building',
    name: 'building',
    description: '',
    c8y_Global: {},
    c8y_IsAssetType: {
      icon: { category: '', name: '' },
      properties: [],
      allowedAssetTypes: [],
      isNoneChildAssetsAllowed: 'false'
    }
  };
  const roomProperties = [{ label: 'Color', isRequired: 'false' }];
  const floorAllowedAssetModels = [{ label: 'Room', isRequired: 'false' }];
  const buildingAllowedAssetModels = [{ label: 'Floor', isRequired: 'true' }];
  for (let i = 0; i < customPropertyObjects.length; i++) {
    cy.apiCreateAssetProperty(customPropertyObjects[i]);
  }
  cy.apiCreateAssetModel(roomObject, roomProperties);
  cy.apiCreateAssetModel(floorObject, undefined, floorAllowedAssetModels);
  cy.apiCreateAssetModel(buildingObject, undefined, buildingAllowedAssetModels);
});

Cypress.Commands.add(
  'provideAnInputForTheTextFieldInAssetHierarchyScreen',
  (textFieldName, input, index) => {
    if (!index) {
      cy.get('formly-form fieldset:nth-child(1) formly-field label')
        .contains(textFieldName)
        .siblings('div')
        .children('div')
        .children('c8y-field-input')
        .children('input')
        .as('textField');
      cy.get('@textField').clear();
      cy.get('@textField').type(input);
    } else {
      cy.get(`formly-form fieldset:nth-child(${index}) formly-field label`)
        .contains(textFieldName)
        .siblings('div')
        .children('div')
        .children('c8y-field-input')
        .children('input')
        .as('textFieldWithIndex');
      cy.get('@textFieldWithIndex').clear();
      cy.get('@textFieldWithIndex').type(input);
    }
  }
);

Cypress.Commands.add('verifyInvalidErrorForNameFieldInAsset', (errorMessage, index) => {
  if (!index) {
    cy.get('formly-form fieldset:nth-child(1) formly-field label')
      .contains('Name')
      .siblings('div')
      .children('div')
      .children('c8y-field-input')
      .children('input')
      .as('textField');
    cy.get('@textField').should('have.class', 'ng-invalid');
    cy.get('@textField')
      .parents('div.form-group.has-error')
      .children('.c8y-messages')
      .should('have.text', errorMessage);
  } else {
    cy.get(`formly-form fieldset:nth-child(${index}) formly-field label`)
      .contains('Name')
      .siblings('div')
      .children('div')
      .children('c8y-field-input')
      .children('input')
      .as('textFieldWithIndex');
    cy.get('@textFieldWithIndex').should('have.class', 'ng-invalid');
    cy.get('@textFieldWithIndex')
      .parents('div.form-group.has-error')
      .children('.c8y-messages')
      .should('have.text', errorMessage);
  }
});

Cypress.Commands.add('verifyThePresenceOfAsset', (assetName, page?) => {
  if (!page) {
    cy.get(`c8y-tree-view-root-node a[title='${assetName}']`).as('assetElement');
    cy.get('@assetElement').scrollIntoView();
    cy.get('@assetElement').should('be.visible');
  } else {
    cy.get(`c8y-sub-assets-grid a[title='${assetName}']`).as('assetElement');
    cy.get('@assetElement').scrollIntoView();
    cy.get('@assetElement').should('be.visible');
  }
});

Cypress.Commands.add('createBuildingAsset', buildingName => {
  const nextButtonInChildHierarchyScreen =
    '.card-footer.separator.sticky-bottom>.btn.btn-primary:nth-child(3)';
  cy.get(assets_page_elements.addAssetButton).click();
  cy.chooseAssetType('Building');
  cy.provideAnInputForTheTextFieldInAssetHierarchyScreen('Name', buildingName);
  cy.provideAnInputForTheTextFieldInAssetHierarchyScreen('Description', 'Buisness Park');
  cy.get(assets_page_elements.nextButton).click();
  cy.provideAnInputForTheTextFieldInAssetHierarchyScreen('Name', 'Floor1');
  cy.provideAnInputForTheTextFieldInAssetHierarchyScreen('Description', 'Buisness Park');
  cy.get(nextButtonInChildHierarchyScreen).click();
  cy.provideAnInputForTheTextFieldInAssetHierarchyScreen('Name', 'Room1');
  cy.get(nextButtonInChildHierarchyScreen).click();
  cy.get(assets_page_elements.createButton).click();
});

Cypress.Commands.add('deleteAsset', assetName => {
  const actionsButton = "button[title='Actions']";
  cy.get(actionsButton).should('be.visible');
  cy.get(`a[title='${assetName}']`)
    .parents("div[class*='c8y-tree-view-node']")
    .siblings('div')
    .children('div')
    .children('div')
    .children(actionsButton)
    .click();
  cy.get("button i[c8yicon='delete']").click();
  cy.get(".alert-footer>button[title='Delete']").click();
});

Cypress.Commands.add('verifyTheAbsenceOfAsset', assetName => {
  // added wait to resolve flakyness
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(3000);
  const selector = `a[title='${assetName}']`;

  cy.get('body').then($body => {
    if ($body.find(selector).length > 0) {
      cy.get(selector).should('not.be.visible');
    } else {
      cy.get(selector).should('not.exist');
    }
  });
});

Cypress.Commands.add('navigateToAssetPageThroughSubAssetsTable', assetName => {
  //added wait to resolve flakyness
  cy.wait(2000); //eslint-disable-line cypress/no-unnecessary-waiting
  cy.get(`a[title='${assetName}']`)
    .eq(0)
    .click({ force: true });
  //added wait to resolve flakyness
  cy.wait(1000); //eslint-disable-line cypress/no-unnecessary-waiting
  cy.get('.c8y-ui-title > .text-truncate')
    .should('be.visible')
    .then($e1 => {
      const retrieveAssetHeading = $e1.text();
      expect(retrieveAssetHeading).to.contain(assetName);
    });
});

Cypress.Commands.add(
  'validateCustomPropertyValueOfAsset',
  (customPropertyName, customPropertyValue) => {
    cy.get('c8y-asset-properties div:has(>p)').should('contain', customPropertyName);
    cy.get('c8y-asset-properties div c8y-asset-properties-item').then($p => {
      if ($p.find('c8y-asset-properties div c8y-asset-properties-item.p').length > 0) {
        cy.get('c8y-asset-properties div c8y-asset-properties-item p').should(
          'contain',
          customPropertyValue
        );
      } else {
        cy.get('c8y-asset-properties div c8y-asset-properties-item').should(
          'contain',
          customPropertyValue
        );
      }
    });
  }
);

Cypress.Commands.add(
  'validateComplexCustomPropertyValueOfAsset',
  (customPropertyName, customPropertyValue) => {
    cy.get('c8y-asset-properties div:has(>p)')
      .contains(customPropertyName)
      .parents('div')
      .siblings('c8y-asset-properties-item')
      .children('ul')
      .children('li')
      .each(($el, i) => {
        const key = $el
          .find('label')
          .text()
          .trim();
        cy.wrap($el)
          .find('span c8y-asset-properties-item')
          .should('contain', customPropertyValue[key]);
      });
  }
);

Cypress.Commands.add('createHierarchicalAssetModels', () => {
  const assetTypes = ['Pac', 'Hvac'];
  cy.navigateToAssetTypesPage();
  cy.get(asset_types_page_elements.addAssetTypeButton).click();
  cy.addLabelInNewAssetTypeScreen(assetTypes[0]);
  cy.get(asset_types_page_elements.descriptionTextBox).click();
  cy.get(asset_types_page_elements.saveAssetTypeButton).click();
  cy.verifyTheTableContent('Model name', 'Pac');
  cy.get(asset_types_page_elements.addAssetTypeButton).click();
  cy.addLabelInNewAssetTypeScreen(assetTypes[1]);
  cy.get(asset_types_page_elements.addChildAssetTypeButton).click();
  cy.addChildAssetType(assetTypes[0]);
  cy.get(asset_types_page_elements.saveAssetTypeButton).click();
  cy.verifyTheTableContent('Model name', 'Hvac');
});

Cypress.Commands.add('provideAnInputForAssetSearch', input => {
  cy.get(assets_page_elements.searchTextBox).type(input);
});

Cypress.Commands.add('verifyTheGlobalSearchResult', assetName => {
  cy.get(" c8y-li-icon~div[class*='c8y-list__item__body']").should('contain.text', assetName);
});

Cypress.Commands.add('navigateToSubassetPageThroughAssetTreeGrid', assetName => {
  const treeTitle = '#treeTitle';
  cy.get(treeTitle).should('be.visible');
  cy.get(`a[title='${assetName}']`)
    .should('exist')
    .click({ force: true });
});

Cypress.Commands.add('expandOrCollapseAssetTreeViewNode', assetNames => {
  for (const asset of assetNames) {
    cy.get(`a[title='${asset}']`).scrollIntoView();
    cy.get(`a[title='${asset}']`).should('be.visible');
    cy.get("i[c8yicon='chevron-right']").should('be.visible');
    cy.get(`a[title='${asset}']`)
      .parents("div[class*='c8y-tree-view-node__header']")
      .siblings("div[class*='c8y-tree-view-node__header']")
      .children('div')
      .scrollIntoView();
    cy.get(`a[title='${asset}']`)
      .parents("div[class*='c8y-tree-view-node__header']")
      .siblings("div[class*='c8y-tree-view-node__header']")
      .children('div')
      .click();
  }
});

Cypress.Commands.add('apiDeleteAssets', () => {
  cy.apiRequest({
    method: 'GET',
    url: `/inventory/managedObjects?fragmentType=c8y_IsAsset&withChildren=false&onlyRoots=true&nocache=${String(
      Math.random()
    )}`,
    failOnStatusCode: false
  }).then((response: any) => {
    for (const mo of response.body.managedObjects) {
      cy.log('Deleting ', mo.id);
      cy.apiRequest({
        method: 'DELETE',
        url: `/inventory/managedObjects/${mo.id}`
      });
    }
  });
});

Cypress.Commands.add('selectDevices', (deviceName, option) => {
  if (option) {
    for (let i = 0; i < deviceName.length; i++) {
      cy.get(`c8y-sub-assets-grid a[title='${deviceName[i]}']`)
        .parents('td')
        .siblings('td')
        .children('label.c8y-checkbox')
        .children('input')
        .check({ force: true });
    }
  } else {
    for (let i = 0; i < deviceName.length; i++) {
      cy.get(`a[title='${deviceName[i]}']`)
        .parents('td')
        .siblings('td')
        .children('label.c8y-checkbox')
        .children('input')
        .check({ force: true });
    }
  }
});

Cypress.Commands.add('deselectDevices', deviceName => {
  for (let i = 0; i < deviceName.length; i++) {
    cy.get(`a[title='${deviceName[i]}']`)
      .parents('td')
      .siblings('td')
      .children('label.c8y-checkbox')
      .children('input')
      .uncheck({ force: true });
  }
});

Cypress.Commands.add('verifyThePresenceOfAssignedDevice', (location, deviceName) => {
  if (location == 'hierarchycreation') {
    cy.get(`div[title='${deviceName}']`).should('be.visible');
  } else if (location == 'subassets') {
    cy.get(`a[title='${deviceName}']`).should('be.visible');
  }
});

Cypress.Commands.add('searchDevices', (deviceName, option, index) => {
  const filterIcon = "button[title='Name']>i";
  const applyButton = "button[title='Name']+ul button[title='Apply']";
  const filterTextField = "button[title='Name']+ul input";
  if (option === 'subasset') {
    index = 1;
  } else {
    index = 0;
  }
  cy.get(filterIcon)
    .eq(index)
    .click({ force: true });
  cy.get(filterTextField).type(deviceName);
  cy.get(applyButton).click();
});

Cypress.Commands.add('removeDevice', (deviceName, instance) => {
  cy.get(`div[title='${deviceName}']`)
    .parents('div')
    .siblings('div')
    .children('button')
    .children("i[c8yicon='minus-circle']")
    .eq(instance - 1)
    .click();
});

Cypress.Commands.add('clickOnActionButton', assetName => {
  const actionButton = "button[title='Actions']";
  cy.get(actionButton).should('be.visible');
  //added wait to resolve flakyness
  cy.wait(1000); //eslint-disable-line cypress/no-unnecessary-waiting
  cy.get(`a[title='${assetName}']`)
    .parents("div[class*='c8y-tree-view-node']")
    .siblings('div')
    .children('div')
    .children('div')
    .children(actionButton)
    .click({ force: true });
});

Cypress.Commands.add('editAssetNameOrDescription', (option, input) => {
  const nameTextBox = '#groupName';
  const descriptionTextBox = '#description';
  if (option === 'Name') {
    cy.get(nameTextBox).click();
    cy.get(nameTextBox).clear();
    cy.get(nameTextBox).type(input);
    cy.get(`${nameTextBox}~div button[title='Save']`)
      .should('be.visible')
      .click();
    cy.get(`input[title='${input}']`).should('be.visible');
  } else {
    cy.get(descriptionTextBox).click();
    cy.get(descriptionTextBox).clear();
    cy.get(descriptionTextBox).type(input);
    cy.get(`${descriptionTextBox}~div button[title='Save']`)
      .should('be.visible')
      .click();
    cy.get(`textarea[title='${input}']`).should('be.visible');
  }
});

Cypress.Commands.add('editCustomPropertyOfAnAsset', (propertyName, parameter: any, option) => {
  cy.get(`div>p[title='${propertyName}']~button[aria-label='Edit']>i`).as('edit');
  cy.get('@edit').scrollIntoView();
  cy.get('@edit').should('be.visible');
  cy.get('@edit').click();
  for (let i = 0; i < parameter.length; i++) {
    switch (parameter[i].type) {
      case 'boolean':
        if (parameter[i].value == 'true') {
          cy.get(`input[id*='${parameter[i].key}']`).check({ force: true });
        } else {
          cy.get(`input[id*='${parameter[i].key}']`).uncheck({ force: true });
        }
        break;
      case 'date':
        cy.get(`input[id*='${parameter[i].key}']`).clear();
        cy.get(`input[id*='${parameter[i].key}']`).type(`${parameter[i].value}{enter}`);
        break;
      case 'fileupload':
        cy.get(`div[aria-labelledby*='${parameter[i].key}'] > c8y-drop-area > input`).selectFile(
          parameter[i].value,
          { force: true }
        );
        break;
      case 'enum':
        cy.get(`input[id*='${parameter[i].key}'][value='${parameter[i].value}']`).check({
          force: true
        });
        break;
      default:
        cy.get(`input[id*='${parameter[i].key}']`).clear();
        cy.get(`input[id*='${parameter[i].key}']`).type(parameter[i].value);
    }
  }
  if (option === 'cancel') {
    cy.get("button[title='Cancel']").click();
  } else {
    cy.get("button[type='button'][title='Save']").click();
  }
});

Cypress.Commands.add('unassignDevice', deviceName => {
  cy.get(`a[title='${deviceName}']`)
    .parents('td')
    .siblings('td')
    .children("button[aria-label='Unassign']")
    .click();
  cy.get("button[title='Unassign']")
    .should('be.visible')
    .click();
});

Cypress.Commands.add('assetModelLabelVisible', title => {
  cy.get(`h4[title=' ${title}']`).should('be.visible');
});

Cypress.Commands.add('selectAssets', assets => {
  for (const asset of assets) {
    cy.get(`a[title='${asset}']`)
      .parents('div[class="c8y-tree-view-node__block"]')
      .children('div[class="c8y-tree-view-node__header__collapse--column"]')
      .children('div')
      .children('div')
      .children('label')
      .children('input[type="checkbox"]')
      .check({ force: true });
  }
});

Cypress.Commands.add('selectFileDuringHierarchyCreation', (propertyName, fileName, instance) => {
  if (instance) {
    cy.get(`#form-field-${instance - 1} c8y-form-group formly-field label`)
      .contains(propertyName)
      .find("~c8y-drop-area div~input[type='file']")
      .selectFile(`cypress/fixtures/${fileName}`, { force: true });
  } else
    cy.get('c8y-form-group formly-field label')
      .contains(propertyName)
      .find("~c8y-drop-area div~input[type='file']")
      .selectFile(`cypress/fixtures/${fileName}`, { force: true });
});
