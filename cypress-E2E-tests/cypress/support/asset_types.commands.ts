import asset_types__page_elements from './page_objects/asset_types_page_elements';
import home_page_elements from './page_objects/home_page_elements';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * This command is being used to verify the table content of Asset types.
       * @param columHeader Name of the column
       * @param content Specify the content that need to be verified.
       * @param isContentNotPresent it is an optional parameter.
       * @param label It is an optional parameter. If you want to check child asset models/ Asset properties.
       * Usage: cy.verifyTheTableContent("Model name", "Building");
       */
      verifyTheTableContent(columnHeader: string, content: string, isContentNotPresent?: boolean, label?: string): void;

      /**
       * This command is being used to select/unselect the Asset type checkboxes.
       * @param option Specify the action that needs to be performed.
       * There are 4 options namely "Check", "Uncheck", "SelectAll", "UnselcetAll".
       * @param assetType Specify the label of an asset type.
       * Usage: cy.selectAssetType("Check", "Building");
       */
      selectAssetType(option: string, assetType?: string): void;

      /**
       * This command is being used to delete an asset type.
       * @param assetType Specify the label of an asset type.
       * Usage: cy.deleteAssetType("Building");
       */
      deleteAssetType(assetType: string): void;

      /**
       * This command is being used to add a label while creating new asset type.
       * @param label Specify the label.
       * Usage: cy.addLabelInNewAssetTypeScreen("Building");
       */
      addLabelInNewAssetTypeScreen(label: string): void;

      /**
       * This command is being used to add a key while creating new asset type.
       * @param key Specify the key.
       * Usage: cy.addKeyInNewAssetTypeScreen("B1");
       */
      addKeyInNewAssetTypeScreen(key: string): void;

      /**
       * This command is being used to add a description while creating new asset type.
       * @param description Specify the description.
       * Usage: cy.addDescriptionInNewAssetTypeScreen("Building Asset Type");
       */
      addDescriptionInNewAssetTypeScreen(description: string): void;

      /**
       * This command is being used to confirm the absence of asset type in the grid.
       * @param assetType Label of an Asset type.
       * Usage: cy.verifyTheAbsenceOfAssetType("Building");
       */
      verifyTheAbsenceOfAssetType(assetType: string): void;

      /**
       * This command is being used to click on Edit button of an asset type.
       * @param assetType Label of an asset type.
       * Usage: cy.clickOnAssetTypeEditButton("Building");
       */
      clickOnAssetTypeEditButton(assetType: string): void;

      /**
       * This command is being used to add a child asset in New/Edit asset type screen.
       * @param assetTypeLabel Label of the child asset type.
       * Usage: cy.addChildAssetType("Floor");
       */
      addChildAssetType(assetTypeLabel: string): void;

      /**
       * This command is being used to add a custom property in New/Edit asset type screen.
       * @param customPropertyLabel Label of the custom property.
       * Usage: cy.addCustomProperty("Color");
       */
      addCustomProperty(customPropertyLabel: string): void;

      /**
       * This command is being used to select an icon in select icon window.
       * @param iconLabel Label of an Icon.
       * Usage: cy.selectIcon("building");
       */
      selectIcon(iconLabel: string): void;

      /**
       * This command is being used to change an icon in New/Edit asset type screen
       * @param iconLabel Label of an icon.
       * Usage: cy.changeIcon("house");
       */
      changeIcon(iconLabel: string): void;

      /**
       * This command is being used to check/uncheck the required checkbox.
       * @param childAssetTypeLabel Label of the child asset type.
       * @param option Specify an option (Check/Uncheck).
       * Usage: requiredChildAssetType("Floor", "Check")
       */
      requiredChildAssetType(childAssetTypeLabel: string, option: string): void;

      /**
       * This command is being used to remove added child asset type in New/Edit asset type screen.
       * @param childAssetTypeLabel Label of the child asset type.
       * Usage: cy.requiredChildAssetType("Floor");
       */
      removeChildAssetType(childAssetTypeLabel: string): void;

      /**
       * This command is being used to check/uncheck the required checkbox.
       * @param customPropertyLabel Label of the custom property.
       * @param option Specify an option (Check/Uncheck).
       * Usage: cy.requiredCustomProperty("Color", "Check");
       */
      requiredCustomProperty(customPropertyLabel: string, option: string): void;

      /**
       * This command is being used to remove added custom property in New/Edit asset type screen.
       * @param customPropertyLabel Label of the custom property.
       * Usage: cy.removeCustomProperty("Color");
       */
      removeCustomProperty(customPropertyLabel: string): void;

      /**
       * This command is being used to remove all the added custom properties in New/Edit asset type screen.
       * Usage: cy.removeAllCustomProperty()
       */
      removeAllCustomProperty(): void;

      /**
       * This command is being used to search an icon in select icon window.
       * @param text Search text
       * Usage: cy.searchIcons('institution');
       */
      searchIcons(text: string): void;

      /**
       * This command is used to add the asset model not having any child asset & properties.
       * @param modelName name of the asset model
       * Usage: cy.addAssetModel("Home");
       */
      addAssetModel(modelName: string): void;

      /**
       * This command is being used to create Asset model through API.
       * @param reqObj Request body of an Asset model.
       * @param assetProperties Asset properties. Ex: {label: "Color", isRequired: "true"}
       * @param allowedAssetModels Child Asset models. Ex: {Label: "Floor", isRequired: "true"}
       * Usage: apiCreateAssetModel(reqobj, assetProperties, allowedAssetModels);
       */
      apiCreateAssetModel(reqObj: object, assetProperties?: any[], allowedAssetModels?: any[]): void;

      /**
       * This command is being used to delete the asset model through API.
       * @param assetModel Asset model which needs to be delete.
       */
      apiDeleteAssetModel(assetModel: string): void;

      /**
       * This command is being used to validate the specified values in edit asset model screen.
       * @param assetModel object that contains the values to be compared.
       * Usage: verifyAssetModel({
          label: 'Building A',
          key:'building-a',
          description: '' ,
          icon: '.asset-type-icon.dlt-c8y-icon-no-image',
          childAssetModels: [
            {
              icon: ".c8y-icon.c8y-icon-group",
              label: 'Floor',
              description:'',
              required:  false
            }
          ] ,
          assetProperties: [{
              icon: ".dlt-c8y-icon-sliders",
              label: 'Asset Prop',
              description:'',
              required:  false
            }]
          })
       */
      verifyAssetModel(assetModel: any): void;

      /**
       * This command is used to add the child asset models and properties to the parent asset model.
       * @param assetModel - Parent asset model
       * @param references - The id's of the newly added child asset models or properties
       * @param allowedAssetTypes - The id's of the asset models
       * @param properties - The id's of the asset properties
       * Usage: updateAssetModel({
       * c8y_Global: {},
       * c8y_IsAssetType:{
       *  allowedAssetTypes: [{id: '74152'}],
       *  properties: [{id: '69854'}]
       * },
       * id: '874569',
       * label: 'Building',
       * name: 'building'
       * },[{id:'96365'},{id:'15987'}],[{id:'96365'}],[{id:'15987'}])
       */
      updateAssetModel(assetModel: any,references: object[],allowedAssetTypes?:number[],properties?: number[])

      /**
       * This command is used to get the MO of the asset model
       * @param assetModelName - The name of the asset model
       * Usage: getAssetModel('Building')
       */
      getAssetModel(assetModelName: string);

      /**
       * This command is used to get the ID of the asset property
       * @param assetProperty - The name of the asset property
       * Usage: getAssetPropertyId('Color')
       */
      getAssetPropertyId(assetProperty: string);
    }
  }
}

Cypress.Commands.add('verifyTheTableContent', (columnHeader, content, isContentNotPresent, label) => {
  if (columnHeader === 'Child asset models' || columnHeader === 'Asset properties') {
    cy.get(`td[data-cell-title='${ columnHeader }']`)
    .children('c8y-cell-renderer')
    .children('ng-component')
    .children('div')
    .children(`span[title='${ content }']`)
    .should('be.visible');
  } else if (isContentNotPresent) {
    cy.get(`span[title='${ content }']`).should('not.exist');
  } else {
    cy.get(`span[title='${ content }']`)
      .parents(`td[data-cell-title='${ columnHeader }']`)
      .should('be.visible');
  }
});

Cypress.Commands.add('selectAssetType', (option, assetType) => {
  let assetTypeCheckBox;
  let selectAllCheckBox;
  const editButton = "i[c8yicon='pencil']";
  if (option === 'Check' || option === 'Uncheck') {
    assetTypeCheckBox = cy
      .get(`span[title='${ assetType }']`)
      .parents('td')
      .siblings('td.cdk-cell.cdk-column-checkbox')
      .children('.c8y-checkbox')
      .children('input');
  } else {
    selectAllCheckBox = ".cdk-header-cell.cdk-column-checkbox>div>label>input[type='checkbox']";
  }
  if (option === 'Check') {
    assetTypeCheckBox.check({ force: true });
  } else if (option == 'Uncheck') {
    assetTypeCheckBox.uncheck({ force: true });
  } else if (option === 'SelectAll') {
    cy.get(editButton).should('be.visible');
    cy.get(selectAllCheckBox).check({ force: true });
  } else if (option === 'UnselectAll') {
    cy.get(editButton).should('be.visible');
    cy.get(selectAllCheckBox).uncheck({ force: true });
  } else {
    cy.log('Mentioned option is incorrect');
  }
});

Cypress.Commands.add('deleteAssetType', assetType => {
  cy.get(`div i~span[title='${ assetType }']`)
    .parents('tr')
    .children('td.cdk-cell.cdk-column-actions')
    .children('button')
    .children("i[c8yicon='delete']")
    .should('be.visible')
    .click();
  cy.get(asset_types__page_elements.deleteAssetTypeConfirmButton)
    .should('be.visible')
    .click();
});

Cypress.Commands.add('addLabelInNewAssetTypeScreen', label => {
  cy.get(asset_types__page_elements.labelTextBox).type(label);
});

Cypress.Commands.add('addKeyInNewAssetTypeScreen', key => {
  cy.get(asset_types__page_elements.keyTextBox).type(key);
});

Cypress.Commands.add('addDescriptionInNewAssetTypeScreen', description => {
  cy.get(asset_types__page_elements.descriptionTextBox).type(description);
});

Cypress.Commands.add('verifyTheAbsenceOfAssetType', assetType => {
  cy.get(`td[data-cell-title='Model name'] span[title='${ assetType }']`).should('not.exist');
});

Cypress.Commands.add('clickOnAssetTypeEditButton', assetType => {
  cy.get(`div i~span[title='${ assetType }']`)
    .parents('td')
    .siblings('td')
    .children('button')
    .children("i[c8yicon='pencil']")
    .click();
});

Cypress.Commands.add('addChildAssetType', assetTypeLabel => {
  const assetTypes = "ng-dropdown-panel[aria-label='Options list']";
  cy.get('div.ng-placeholder')
    .contains('Select asset model')
    .parent('div')
    .children(asset_types__page_elements.selectAssetTypeDropdown)
    .click();
  cy.get(assetTypes)
    .contains(assetTypeLabel)
    .click();
});

Cypress.Commands.add('addCustomProperty', customPropertyLabel => {
  const customProperties = "ng-dropdown-panel[aria-label='Options list']";
  cy.get('div.ng-placeholder')
    .contains('Select asset property')
    .parent('div')
    .children(asset_types__page_elements.selectCustomPropertyDropdown)
    .click();
  cy.get(customProperties)
    .contains(customPropertyLabel)
    .click();
});

Cypress.Commands.add('selectIcon', iconLabel => {
  const icon = `.d-block.icon-40.dlt-c8y-icon-${ iconLabel }`;
  cy.get(asset_types__page_elements.selectIconButton).click();
  cy.get(icon).click();
  cy.get(asset_types__page_elements.saveButtonSelectIconWindow).click();
});

Cypress.Commands.add('changeIcon', iconLabel => {
  const icon = `.d-block.icon-40.dlt-c8y-icon-${ iconLabel }`;
  cy.get(asset_types__page_elements.changeIconButton).click();
  cy.get(icon).click();
  cy.get(asset_types__page_elements.saveButtonSelectIconWindow).click();
});

Cypress.Commands.add('requiredChildAssetType', (childAssetTypeLabel, option) => {
  cy.get(`div[title='${ childAssetTypeLabel }']`)
    .parent('div')
    .siblings('div')
    .children('label')
    .children("input[type='checkbox']").as('requiredCheckbox');
  if (option === 'true') {
    cy.get('@requiredCheckbox').check({ force: true });
  } else {
    cy.get('@requiredCheckbox').uncheck({ force: true });
  }
});

Cypress.Commands.add('removeChildAssetType', childAssetTypeLabel => {
  cy.get(`div[title='${ childAssetTypeLabel }']`)
    .parent('div')
    .siblings('div')
    .children("button[aria-label='Remove']")
    .click();
});

Cypress.Commands.add('requiredCustomProperty', (customPropertyLabel, option) => {
  cy.get(`div[title='${ customPropertyLabel }']`)
    .parent('div')
    .siblings('div')
    .children('label')
    .children("input[type='checkbox']").as('requiredCheckbox');
  if (option === 'true') {
    cy.get('@requiredCheckbox').check({ force: true });
  } else {
    cy.get('@requiredCheckbox').uncheck({ force: true });
  }
});

Cypress.Commands.add('removeCustomProperty', customPropertyLabel => {
  cy.get(`div[title='${ customPropertyLabel }']`)
    .parent('div')
    .siblings('div')
    .children("button[aria-label='Remove']")
    .click();
});

Cypress.Commands.add('removeAllCustomProperty', () => {
  cy.get('c8y-li-icon[icon="sliders"]~div button[aria-label="Remove"]').each(
    ($e1, index, $list) => {
      {
        cy.wrap($e1).click();
      }
    }
  );
});

Cypress.Commands.add('searchIcons', text => {
  cy.get('#filter-icons')
    .clear();
  cy.get('#filter-icons')
    .type(text);
});

Cypress.Commands.add('addAssetModel', modelName => {
  cy.get(home_page_elements.addAssetModelButton).click();
  cy.addLabelInNewAssetTypeScreen(modelName);
  cy.get(asset_types__page_elements.keyTextBox).click();
  cy.get(asset_types__page_elements.saveAssetTypeButton).click();
  cy.verifyTheTableContent('Model name', modelName);
});

Cypress.Commands.add('apiCreateAssetModel', (reqObj, assetProperties, allowedAssetModels) => {
  const modifiedObj: any = reqObj;
  const childReferences = { references: [] };
  if (assetProperties) {
    for (let i = 0; i < assetProperties.length; i++) {
      cy.apiRequest({
        method: 'GET',
        url:
          `/inventory/managedObjects?query=$filter=((has(c8y_JsonSchema)) and (has(c8y_IsAssetProperty)) and ('label' eq '${
          assetProperties[i].label
          }'))`,
        failOnStatusCode: false
      }).then((response: any) => {
        const propertyId = response.body.managedObjects[0].id;
        cy.log(propertyId);
        let propertyObject;
        if (assetProperties[i].isRequired == 'true') {
          propertyObject = {
            id: `${ propertyId }`,
            isRequired: `${ assetProperties[i].isRequired }`
          };
        } else {
          propertyObject = { id: `${ propertyId }` };
        }
        modifiedObj.c8y_IsAssetType.properties.push(propertyObject);
        childReferences.references.push({ managedObject: { id: `${ propertyId }` } });
      });
    }
  }
  if (allowedAssetModels) {
    for (let i = 0; i < allowedAssetModels.length; i++) {
      cy.apiRequest({
        method: 'GET',
        url:
          `/inventory/managedObjects?query=$filter=((has(c8y_IsAssetType)) and ('label' eq '${
          allowedAssetModels[i].label
          }'))`,
        failOnStatusCode: false
      }).then((response: any) => {
        const assetModelId = response.body.managedObjects[0].id;
        cy.log(assetModelId);
        let assetModelObject;
        if (allowedAssetModels[i].isRequired == 'true') {
          assetModelObject = {
            id: `${ assetModelId }`,
            isRequired: `${ allowedAssetModels[i].isRequired }`
          };
        } else {
          assetModelObject = { id: `${ assetModelId }` };
        }
        modifiedObj.c8y_IsAssetType.allowedAssetTypes.push(assetModelObject);
        childReferences.references.push({ managedObject: { id: `${ assetModelId }` } });
      });
    }
  }
  cy.apiRequest({
    method: 'POST',
    url: '/inventory/managedObjects',
    body: modifiedObj
  }).then((response: any) => {
    const parentId = response.body.id;
    cy.apiRequest({
      method: 'POST',
      url: `/inventory/managedObjects/${ parentId }/childAdditions`,
      headers: {
        'Content-Type': 'application/vnd.com.nsn.cumulocity.managedObjectReferenceCollection+json'
      },
      body: childReferences
    });
  });
});

Cypress.Commands.add('apiDeleteAssetModel', assetModel => {
  cy.apiRequest({
    method: 'GET',
    url:
      `/inventory/managedObjects?query=$filter=((has(c8y_IsAssetType)) and ('label' eq '${
      assetModel
      }'))`,
    failOnStatusCode: false
  }).then((response: any) => {
    const modelId = response.body.managedObjects[0].id;
    cy.apiRequest({
      method: 'DELETE',
      url: `inventory/managedObjects/${ modelId}`,
      failOnStatusCode: false
    });
  });
});

Cypress.Commands.add('verifyAssetModel', assetModel => {
  cy.clickOnAssetTypeEditButton(assetModel.label);
  const emptyChildAssetModelsMessage =
    'No allowed child assets.Click below to add allowed child asset models.';
  const emptyAssetPropertiesMessage =
    'No asset properties selected.Click below to add asset properties to this asset model.';
  cy.get(asset_types__page_elements.saveAssetTypeButton).should('be.disabled');
  cy.get(asset_types__page_elements.labelTextBox).should('have.value', assetModel.label);
  cy.get(asset_types__page_elements.keyTextBox).should('have.value', assetModel.key);
  if (Object.prototype.hasOwnProperty.call(assetModel, 'description'))
    cy.get(asset_types__page_elements.descriptionTextBox).should(
      'have.value',
      assetModel.description
    );
  if (Object.prototype.hasOwnProperty.call(assetModel, 'icon'))
    cy.get(assetModel.icon).should('be.visible');
  if (
    Object.prototype.hasOwnProperty.call(assetModel, 'childAssetModels') &&
    assetModel.childAssetModels &&
    assetModel.childAssetModels.length > 0
  ) {
    assetModel.childAssetModels.forEach(childAssetModel => {
      cy.get(asset_types__page_elements.assetTypeChildren)
        .contains('Allowed child asset models')
        .siblings('c8y-list-group')
        .find('.c8y-list__item')
        .each(($el, index, list) => {
          verifyChildAssetModelsOrProperties($el, 'childAssetModels', childAssetModel);
        });
    });
  } else if (Object.prototype.hasOwnProperty.call(assetModel, 'childAssetModels')) {
    cy.contains(emptyChildAssetModelsMessage);
  }
  if (
    Object.prototype.hasOwnProperty.call(assetModel, 'childAssetModels') &&
    assetModel.assetProperties &&
    assetModel.assetProperties.length > 0
  ) {
    assetModel.assetProperties.forEach(assetProperty => {
      cy.get(asset_types__page_elements.assetTypeChildren)
        .contains('Selected asset properties')
        .siblings('c8y-list-group')
        .find('.c8y-list__item')
        .each(($el, index, list) => {
          verifyChildAssetModelsOrProperties($el, 'assetProperties', assetProperty);
        });
    });
  } else if (Object.prototype.hasOwnProperty.call(assetModel, 'childAssetModels')) {
    cy.contains(emptyAssetPropertiesMessage);
  }
});

/**
 * TO-Do: updating the asset model with label, description change and deletion of child asset models and properties needs to be added.
 */
Cypress.Commands.add('updateAssetModel',(assetModel: any,references: object[],allowedAssetTypes?: number[],properties?: number[]) => {
    const assetModelMO = {
      c8y_Global: '',
      c8y_IsAssetType: {
        allowedAssetTypes: allowedAssetTypes? allowedAssetTypes: [],
        icon: {name: '', category: ''},
        isNoneChildAssetsAllowed: false,
        properties: properties ? properties : []
      },
      id: assetModel.body.managedObjects[0].id,
      description: '',
      label: assetModel.body.managedObjects[0].label,
      name: assetModel.body.managedObjects[0].name
    };
    const childAdditionsMO = {
      references: references
    };

      cy.apiRequest({
        method: 'PUT',
        url: '/inventory/managedObjects/' + assetModel.body.managedObjects[0].id,
        body: assetModelMO
      }).then(() => {
        for(let i=0;i<childAdditionsMO.references.length;i++) {
          cy.apiRequest({
            method: 'POST',
            url: '/inventory/managedObjects/' + assetModel.body.managedObjects[0].id + '/childAdditions',
            body: childAdditionsMO.references[i]
          });
        }
      });
});

Cypress.Commands.add('getAssetModel', (assetModelName: string) =>{
  cy.apiRequest({
    method:'GET',
    url: `/inventory/managedObjects?query=$filter=((has(c8y_IsAssetType)) and ('label' eq '${
      assetModelName
      }'))`
  }).then(assetModel => {
    return assetModel;
  });
});

Cypress.Commands.add('getAssetPropertyId',(assetProperty: string) => {
  cy.apiRequest({
    method:'GET',
    url:`/inventory/managedObjects?query=$filter=((has(c8y_JsonSchema)) and (has(c8y_IsAssetProperty)) and ('label' eq '${assetProperty}'))`,
}).then((response:any) => {
  const propertyId = response.body.managedObjects[0].id;
  return propertyId;
});
});

function verifyChildAssetModelsOrProperties($el, type, assetModelChildren) {
  cy.wrap($el)
    .find('.flex-grow.text-truncate>div')
    .invoke('attr', 'title')
    .then(val => {
      if (val == assetModelChildren.label) {
        if (assetModelChildren.icon && type == 'childAssetModels')
          cy.wrap($el)
            .find(assetModelChildren.icon)
            .should('be.visible');
        if (assetModelChildren.icon && type == 'assetProperties')
          cy.wrap($el)
            .find(asset_types__page_elements.childAssetPropertyDefaultIcon)
            .should('be.visible');
        assetModelChildren.description
          ? cy
              .wrap($el)
              .find(`[title='${ assetModelChildren.description }']`)
              .should('exist')
          : cy
              .wrap($el)
              .find(`[title='${ assetModelChildren.description }']`)
              .should('not.exist');
        assetModelChildren.required
          ? cy
              .wrap($el)
              .find(asset_types__page_elements.isRequiredCheckBox)
              .should('be.checked')
          : cy
              .wrap($el)
              .find(asset_types__page_elements.isRequiredCheckBox)
              .should('not.be.checked');
        cy.wrap($el)
          .find(asset_types__page_elements.removeButton)
          .should('be.visible');
      }
    });
}
