import asset_properties_widget_elements from './page_objects/asset_properties_widget_elements';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * This command is being used to select the asset/device in configuration section of asset properties widget.
       * @param label Name of the asset/device to select
       * @param targetIndex If multiple elements are found, specify the target element index; otherwise, it is optional.
       * Additionally, it is optional if the target element is at index '0'
       * Usage: cy.chooseAssetOrDevice("Building");
       */
      chooseAssetOrDevice(label: string, targetIndex?: number): void;

      /**
       * This command is being used to select the checkbox corresponding to the property under property selection section of asset properties widget.
       * @param title key of the property
       * Usage: cy.selectProperty("name");
       */
      selectProperty(title: string): void;

      /**
       * This command is being used to deselect the checkbox corresponding to the property under property selection section of asset properties widget.
       * @param title key of the property
       * Usage: cy.unselectProperty("name");
       */
      unselectProperty(title: string): void;

      /**
       * This command is being used to delete the asset properties widget.
       * Usage: cy.deleteCard();
       */
      deleteCard(): void;

      /**
       * This command is being used to verify the absence of property under property selection section of asset properties widget.
       * @param assetName name of the asset
       * @param property key of the asset property
       * Usage: cy.verifyTheAbsenceOfAssetProperty("Building", "name");
       */
      verifyTheAbsenceOfAssetProperty(
        assetName: string,
        property: string
      ): void;

      /**
       * This command is being used to select the asset property and save it under configuration section of asset properties widget.
       * @param assetName name of the asset
       * @param property key of the asset property
       * Usage: cy.selectAssetPropertyAndSave("Building", "name");
       */
      selectAssetPropertyAndSave(assetName: string, property: string): void;

      /**
       * This command is being used to click the edit button of the specific property under asset properties widget view section.
       * @param property Name of the property
       * Usage: cy.clickPropertyEditButton("Name");
       */
      clickPropertyEditButton(property: string): void;

      /**
       * This command is being used to delete all widget instances in dashboard.
       * @param title Array of all widget title
       * Usage: cy.deleteWidgetInstances(['Test1','Test2']);
       */
      deleteWidgetInstances(title: string[]): void;

      /**
       * This command is being used to select the asset in configuration section of asset properties widget and to save.
       * @param assetName Name of the asset to select
       * Usage: cy.selectAssetAndSave("Building");
       */
      selectAssetAndSave(assetName: string): void;

      /**
       * This command is being used to select the subasset in configuration section of asset properties widget.
       * @param assetName Name of the asset to select
       * Usage: cy.selectSubasset("Building");
       */
      selectSubasset(assetName: string): void;

      /**
       * This command is being used to click on the asset
       * @param assetName Name of the asset
       * @param targetIndex If multiple elements are found, specify the target element index; otherwise, it is optional.
       * Additionally, it is optional if the target element is at index '0'
       * Usage: clickOnAsset('Amazon');
       */
      clickOnAsset(assetName: string, targetIndex?: number): void;

      /**
       * This command is being used to validate the property value in the view.
       * @param propertyLabel Property label
       * @param value Property value
       * @param isComplex If you want to validate complex property, specify the isComplex as "true"; otherwise, it is optional.
       * Note: If the properties are complex, pass them as comma-separated values, for example, "Minor:2,Major:3,Critical:1".
       * Usage: cy.validatePropertyValue('Alarm count today','2');
       */
      validatePropertyValue(
        propertyLabel: string,
        value: string,
        isComplex?: boolean
      ): void;
    }
  }
}

Cypress.Commands.add('chooseAssetOrDevice', (label, targetIndex?: number) => {
  let index = 0;
  if (targetIndex) {
    index = targetIndex;
  }
  cy.get(`div[title*='${label}']`)
    .eq(index)
    .children('div[class*="checkbox"]')
    .children('label')
    .children('input[type="radio"]')
    .check({ force: true });
});

Cypress.Commands.add('selectProperty', (title) => {
  cy.get(asset_properties_widget_elements.filterPropertiesTextBox)
    .should('be.visible')
    .clear();
  cy.get(asset_properties_widget_elements.filterPropertiesTextBox).type(title);
  cy.get(`div[title='${title}']`)
    .parent('div')
    .children('div')
    .children('label')
    .children('input[type="checkbox"]')
    .check({ force: true });
});

Cypress.Commands.add('unselectProperty', (title) => {
  cy.get(asset_properties_widget_elements.filterPropertiesTextBox)
    .should('be.visible')
    .clear();
  cy.get(asset_properties_widget_elements.filterPropertiesTextBox).type(title);
  cy.get(`div[title='${title}']`)
    .parent('div')
    .children('div')
    .children('label')
    .children('input[type="checkbox"]')
    .uncheck({ force: true });
});

Cypress.Commands.add('deleteCard', () => {
  cy.intercept({
    method: 'PUT',
    url: '**/inventory/managedObjects/**',
  }).as('removed');
  cy.get(asset_properties_widget_elements.settingsButton)
    .should('be.visible')
    .click();
  cy.get(asset_properties_widget_elements.removeWidgetButton)
    .should('be.visible')
    .click();
  cy.get(asset_properties_widget_elements.removeButton)
    .should('be.visible')
    .click();
  cy.wait('@removed');
});

Cypress.Commands.add(
  'verifyTheAbsenceOfAssetProperty',
  (assetName, property) => {
    cy.chooseAssetOrDevice(assetName);
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    // workaround for assettypes cache issue
    cy.selectProperty('owner');
    cy.get(asset_properties_widget_elements.selectButton).click();
    cy.get(asset_properties_widget_elements.addPropertyButton).click();
    // workaround for assettypes cache issue
    cy.get(`div[title='${property}']`).should('not.exist');
  }
);

Cypress.Commands.add('selectAssetPropertyAndSave', (assetName, property) => {
  cy.chooseAssetOrDevice(assetName);
  cy.get(asset_properties_widget_elements.addPropertyButton).click();
  // workaround for assettypes cache issue
  cy.selectProperty('owner');
  cy.get(asset_properties_widget_elements.selectButton).click();
  cy.get(asset_properties_widget_elements.addPropertyButton).click();
  // workaround for assettypes cache issue
  cy.selectProperty(property);
  cy.get(asset_properties_widget_elements.selectButton).click();
  cy.get(asset_properties_widget_elements.saveButton).click();
});

Cypress.Commands.add('clickPropertyEditButton', (property) => {
  cy.get(`p[title='${property}']`)
    .siblings("button[data-cy='asset-properties-edit-icon']")
    .children("i[c8yicon='pencil']")
    .click();
});

Cypress.Commands.add('deleteWidgetInstances', (title) => {
  cy.intercept({
    method: 'PUT',
    url: '**/inventory/managedObjects/**',
  }).as('removed');
  for (let i = 0; i < title.length; i++) {
    cy.get('c8y-dashboard-child-title span')
      .eq(0)
      .parents('c8y-dashboard-child-title')
      .siblings("div[class*='header-actions']")
      .children("div[placement='bottom right']")
      .children("button[title='Settings']")
      .click();
    cy.get(asset_properties_widget_elements.removeWidgetButton)
      .should('be.visible')
      .click();
    cy.get(asset_properties_widget_elements.removeButton)
      .should('be.visible')
      .click();
    cy.wait('@removed');
  }
});

Cypress.Commands.add('selectAssetAndSave', (assetName) => {
  cy.chooseAssetOrDevice(assetName);
  // added wait to resolve flakyness after selecting asset its takes few ms to enabled save button
  cy.wait(1000);
  cy.get(asset_properties_widget_elements.saveButton).click();
});

Cypress.Commands.add('selectSubasset', (assetName) => {
  cy.get(`div[title='${assetName}']`)
    .children('div[class*="checkbox"]')
    .children('label')
    .children('input[type="radio"]')
    .check({ force: true });
});

Cypress.Commands.add('clickOnAsset', (assetName, targetIndex?: number) => {
  let index = 0;
  if (targetIndex) {
    index = targetIndex;
  }
  cy.intercept('/inventory/managedObjects/**').as('manageObjectCall');
  cy.get(`button p[title='${assetName}']`)
    .eq(index)
    .should('be.visible')
    .click({ force: true });
  cy.wait('@manageObjectCall').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add(
  'validatePropertyValue',
  (propertyLabel, value, isComplex?) => {
    if (isComplex) {
      const commaSeparatedValues = value.split(',');
      const complexPropertyKeysAndValues = commaSeparatedValues.map((pair) => {
        const [key, value] = pair.split(':');
        return { key, value };
      });
      for (let i = 0; i < complexPropertyKeysAndValues.length; i++) {
        cy.get(`p[title='${propertyLabel}']`)
          .parent('div')
          .siblings('c8y-asset-properties-item')
          .children('ul')
          .children('span')
          .children('li')
          .children(`label[title='${complexPropertyKeysAndValues[i].key}']`)
          .siblings('span')
          .children('c8y-asset-properties-item')
          .children(`p[title*='${complexPropertyKeysAndValues[i].value}']`)
          .as('propertyValue');
        cy.get('@propertyValue').scrollIntoView();
        cy.get('@propertyValue').should('be.visible');
      }
    } else {
      cy.get(`p[title='${propertyLabel}']`)
        .parent('div')
        .siblings('c8y-asset-properties-item')
        .children(`p[title*='${value}']`)
        .as('propertyValue');
      cy.get('@propertyValue').scrollIntoView();
      cy.get('@propertyValue').should('be.visible');
    }
  }
);
