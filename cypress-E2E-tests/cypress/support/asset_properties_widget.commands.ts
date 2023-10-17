import asset_properties_widget_elements from './page_objects/asset_properties_widget_elements';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * This command is being used to select the asset in configuration section of asset properties widget.
       * @param assetName Name of the asset to select
       * Usage: cy.selectAsset("Building");
       */
      selectAsset(assetName: string): void;

      /**
       * This command is being used to select the checkbox corresponding to the property under property selection section of asset properties widget.
       * @param title key of the property
       * Usage: cy.selectAssetProperty("name");
       */
      selectAssetProperty(title: string): void;

      /**
       * This command is being used to deselect the checkbox corresponding to the property under property selection section of asset properties widget.
       * @param title key of the property
       * Usage: cy.unselectAssetProperty("name");
       */
      unselectAssetProperty(title: string): void;

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
      verifyTheAbsenceOfAssetProperty(assetName: string, property: string): void;

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
    }
  }
}

Cypress.Commands.add('selectAsset', assetName => {
  cy.get(`div[title='Assets > ${assetName}']`)
    .children('div[class*="checkbox"]')
    .children('label')
    .children('input[type="radio"]')
    .check({ force: true });
});

Cypress.Commands.add('selectAssetProperty', title => {
  cy.get(`div[title='${title}']`)
    .parent('div[class*="d-flex a-i-center property"]')
    .children('div[class*="col-xs-2"]')
    .children('span')
    .children('label')
    .children('input[type="checkbox"]')
    .check({ force: true });
});

Cypress.Commands.add('unselectAssetProperty', title => {
  cy.get(`div[title='${title}']`)
    .parent('div[class*="d-flex a-i-center property"]')
    .children('div[class*="col-xs-2"]')
    .children('span')
    .children('label')
    .children('input[type="checkbox"]')
    .uncheck({ force: true });
});

Cypress.Commands.add('deleteCard', () => {
  cy.intercept({
    method: 'PUT',
    url: '**/inventory/managedObjects/**'
  }).as('removed');
  cy.get(asset_properties_widget_elements.settingsButton).should('be.visible').click();
  cy.get(asset_properties_widget_elements.removeWidgetButton).should('be.visible').click();
  cy.get(asset_properties_widget_elements.removeButton).should('be.visible').click();
  cy.wait('@removed');
});

Cypress.Commands.add('verifyTheAbsenceOfAssetProperty', (assetName, property) => {
  cy.selectAsset(assetName);
  cy.get(asset_properties_widget_elements.addPropertyButton).click();
  // workaround for assettypes cache issue
  cy.selectAssetProperty('owner');
  cy.get(asset_properties_widget_elements.selectButton).click();
  cy.get(asset_properties_widget_elements.addPropertyButton).click();
  // workaround for assettypes cache issue
  cy.get(`div[title='${property}']`).should('not.exist');
});

Cypress.Commands.add('selectAssetPropertyAndSave', (assetName, property) => {
  cy.selectAsset(assetName);
  cy.get(asset_properties_widget_elements.addPropertyButton).click();
  // workaround for assettypes cache issue
  cy.selectAssetProperty('owner');
  cy.get(asset_properties_widget_elements.selectButton).click();
  cy.get(asset_properties_widget_elements.addPropertyButton).click();
  // workaround for assettypes cache issue
  cy.selectAssetProperty(property);
  cy.get(asset_properties_widget_elements.selectButton).click();
  cy.get(asset_properties_widget_elements.saveButton).click();
});

Cypress.Commands.add('clickPropertyEditButton', property => {
  cy.get(`p[title='${property}']`)
    .siblings("button[data-cy='asset-properties-edit-icon']")
    .children("i[c8yicon='pencil']")
    .click();
});

Cypress.Commands.add('deleteWidgetInstances', title => {
  cy.intercept({
    method: 'PUT',
    url: '**/inventory/managedObjects/**'
  }).as('removed');
  for (let i = 0; i < title.length; i++) {
    cy.get('c8y-dashboard-child-title span')
      .eq(0)
      .parents('c8y-dashboard-child-title')
      .siblings("div[class*='header-actions']")
      .children("div[placement='bottom right']")
      .children("button[title='Settings']")
      .click();
    cy.get(asset_properties_widget_elements.removeWidgetButton).should('be.visible').click();
    cy.get(asset_properties_widget_elements.removeButton).should('be.visible').click();
    cy.wait('@removed');
  }
});

Cypress.Commands.add('selectAssetAndSave', assetName => {
  cy.selectAsset(assetName);
  cy.get(asset_properties_widget_elements.saveButton).click();
});

Cypress.Commands.add('selectSubasset', assetName => {
  cy.get(`div[title='${assetName}']`)
    .children('div[class*="checkbox"]')
    .children('label')
    .children('input[type="radio"]')
    .check({ force: true });
});
