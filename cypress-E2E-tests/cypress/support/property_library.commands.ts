import property_library_page_elements from './page_objects/property_library_page_elements';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * This command is being used to create a normal custom property.
       * @param parameter need to pass an object which contains parameters to create a property.
       * Ex: parameter = {label:"Color", key:"C", type:"Text", maxLength:"10", minLength:"3"}
       * Usage: cy.addNormalCustomProperty(parameter);
       */
      addNormalCustomProperty(parameter:object): void;

      /**
       * This command is being used to verify the presence/absence of the given property.
       * @param property  Property label.
       * Usage: cy.deleteProperty("Color");
       */
      verifyThePropertyList(propertyLabel:string, isPropertyNotPresent?:boolean): void;

      /**
       * This command is being used to delete the property.
       * @param property Property label.
       * Usage: cy.deleteProperty("Color");
       */
      deleteProperty(property:string): void;

      /**
       * This command is being used to filter the properties based on text.
       * @param filterText Specify the filter text.
       * Usage: cy.filterProperties("Color");
       */
      filterProperties(filterText:string): void;

      /**
       * This command is being used to create a complex custom property.
       * @param parameter you need to pass an array of object which contains parameters to create a property.
       * Ex: parameter = [{label:"BuildingProperties", key:"BP"}
       *                  {label:"Color", key:"C", type:"Enumeration", values:"Red,Green,Blue"}
       *                  {label:"Temperature", key:"T", type:"Number", minimum:"21", maximum:"27"}]
       * @param numberOfProperty Number of properties included in complex custom property.
       * Usage: cy.addComplexCustomProperty(parameter, 2);
       */
      addComplexCustomProperty(parameter:object[], numberOfProperty:number): void;

      /**
       * This command is being used to click on the property in property list.
       * @param propertyLabel Name of the property.
       * Usage: cy.clickOnCustomProperty('Color);
       *
       */
      clickOnCustomProperty(propertyLabel:string): void;

      /**
       * This command is being used to create an asset property through API.
       * @param reqObj Request body.
       * Usage: cy.apiCreateAssetProperty(object);
       */
      apiCreateAssetProperty(reqObj:object): void;

      /**
       * This command is being used to delete the asset property through API.
       * @param assetProperty asset property which needs to be deleted.
       * Usage: cy.apiDeleteAssetProperty("Color");
       *
       */
      apiDeleteAssetProperty(assetProperty:string): void;

      /**
       * This command is being used to validate the specified values in edit custom property screen.
       * @param assetModel object that contains the values to be compared.
       * Usage: verifyAssetProperties({
          label: 'Asset Prop',
          key:'asset-prop',
          description: '' ,
          complexPropertyCheckBox: false,
          type: {
            type: 'Enumeration',
            enumValues: 'a,b,c'
          }
        })
      */
      verifyAssetProperties(property:object): void;
    }
  }
}

Cypress.Commands.add('addNormalCustomProperty', (parameter:any) => {
  const defaultValueTextBox = '#string-property-defaultValue-property-0';
  cy.get(property_library_page_elements.addCustomPropertyButton).click();
  cy.get(property_library_page_elements.labelTextBox).type(parameter.label);
  cy.get(property_library_page_elements.descriptionTextBox).click();
  if ('description' in parameter) {
    cy.get(property_library_page_elements.descriptionTextBox).type(parameter.description);
  }
  if ('type' in parameter && parameter.type === 'Text') {
    if ('defaultValue' in parameter) {
      cy.get(defaultValueTextBox).type(parameter.defaultValue);
    }
    if ('minLength' in parameter) {
      cy.contains('Min Length').click({ force: true });
      const minTextBox = '#complex-property-minlength-property-0';
      cy.get(minTextBox).type(parameter.minLength);
    }
    if ('maxLength' in parameter) {
      cy.contains('Max Length').click({ force: true });
      const maxTextBox = '#complex-property-maxlength-property-0';
      cy.get(maxTextBox).type(parameter.maxLength);
    }
    if ('regExp' in parameter) {
      cy.contains('Reg Exp').click({ force: true });
      const regExpTextBox = '#complex-property-regex-property-0';
      cy.get(regExpTextBox).type(parameter.regExp);
    }
  } else if ('type' in parameter && parameter.type === 'Number') {
    cy.get(property_library_page_elements.typeDropdown).click({ force: true });
    cy.get(
      `ng-dropdown-panel[aria-label='Options list'] div[title='${ parameter.type }']`
    ).click();
    if ('defaultValue' in parameter) {
      cy.get(defaultValueTextBox).type(parameter.defaultValue);
    }
    if ('minimum' in parameter) {
      cy.contains('Minimum').click({ force: true });
      const minTextBox = '#complex-property-min-property-0';
      cy.get(minTextBox).type(parameter.minimum);
    }
    if ('maximum' in parameter) {
      cy.contains('Maximum').click();
      const maxTextBox = '#complex-property-max-property-0';
      cy.get(maxTextBox).type(parameter.maximum);
    }
  } else if ('type' in parameter && parameter.type === 'File Upload') {
    cy.get(property_library_page_elements.typeDropdown).click({ force: true });
    cy.get(
      `ng-dropdown-panel[aria-label='Options list'] div[title='${ parameter.type }']`
    ).click();
    if ('allowedFileTypes' in parameter) {
      const allowedFileTypesTextBox = '#complex-property-fileUpload-property-0';
      cy.get(allowedFileTypesTextBox).type(parameter.allowedFileTypes);
    }
    if ('fileMaxSize' in parameter) {
      const fileSizeTextBox = '#complex-property-file-max-size-property-0';
      cy.get(fileSizeTextBox).type(parameter.fileMaxSize);
    }
  } else if ('type' in parameter && parameter.type === 'Date Picker') {
    cy.get(property_library_page_elements.typeDropdown).click({ force: true });
    cy.get(
      `ng-dropdown-panel[aria-label='Options list'] div[title='${ parameter.type }']`
    ).click();
  } else if ('type' in parameter && parameter.type === 'Enumeration') {
    cy.get(property_library_page_elements.typeDropdown).click({ force: true });
    cy.get(
      `ng-dropdown-panel[aria-label='Options list'] div[title='${ parameter.type }']`
    ).click();
    if ('values' in parameter) {
      const valuesTextBox = '#complex-property-enum-property-0';
      cy.get(valuesTextBox).type(parameter.values);
    }
  } else if ('type' in parameter && parameter.type === 'Boolean') {
    cy.get(property_library_page_elements.typeDropdown).click({ force: true });
    cy.get(
      `ng-dropdown-panel[aria-label='Options list'] div[title='${ parameter.type }']`
    ).click();
  }
  cy.get(property_library_page_elements.saveNewPropertyButton).click();
  cy.get('.alert.animated.fadeInRightBig.m-t-16.interact.alert-success')
    .contains(`Asset property '${ parameter.label }'added successfully!`)
    .should('not.exist');
});

Cypress.Commands.add('verifyThePropertyList', (propertyLabel, isPropertyNotPresent) => {
  if (isPropertyNotPresent) {
    cy.get(`button[title='${ propertyLabel }']`).should('not.exist');
  } else {
    cy.get(`button[title='${ propertyLabel }']`).should('be.visible');
  }
});

 Cypress.Commands.add('deleteProperty', (property) => {
    const propertyList = 'button.c8y-stacked-item>span:nth-child(2)';
    const text = 'No asset property selected.';
    cy.filterProperties(property);
    cy.get(propertyList).should('exist').should('have.text', property).click({ force: true });
    cy.get(property_library_page_elements.deletePropertyButton).click();
    cy.get(".alert-footer>button[title='Confirm']").should('be.visible').click();
    cy.contains(text);
});

Cypress.Commands.add('filterProperties', (filterText) => {
    cy.get(property_library_page_elements.filterTextBox).clear();
    cy.get(property_library_page_elements.filterTextBox).type(filterText);
});

Cypress.Commands.add('addComplexCustomProperty', (parameter:any, numberOfProperty) => {
  cy.get(property_library_page_elements.addCustomPropertyButton).click();
  cy.get(property_library_page_elements.labelTextBox).type(parameter[0].label);
  cy.get(property_library_page_elements.complexPropertyCheckBox).click({ force: true });
  if ('description' in parameter[0]) {
    cy.get(property_library_page_elements.descriptionTextBox).type(parameter[0].description);
  }
  for (let i = 1; i <= numberOfProperty; i++) {
    let j = i;
    if (i > 1) {
      cy.get(property_library_page_elements.addPropertyButton).click();
      j--;
    }
    const label = `#complex-property-label-${ i - 1 }`;
    const key = `#complex-property-key-${ i - 1 }`;
    cy.get(label).type(parameter[i].label);
    cy.get(key).type(parameter[i].key);
    cy.get(label).click();
    if ('type' in parameter[i] && parameter[i].type === 'Text') {
      if ('defaultValue' in parameter) {
        const defaultValueTextBox = `#complex-property-defaultValue-${ i - 1 }`;
        cy.get(defaultValueTextBox).type(parameter[i].defaultValue);
      }
      if ('minLength' in parameter[i]) {
        const minTextBox = `#complex-property-minlength-${ i - 1 }`;
        cy.get('fieldset')
          .eq(j)
          .children('formly-field')
          .children('formly-group')
          .children('formly-field')
          .children('c8y-field-checkbox')
          .children('label')
          .children("input[id*='requiredMinLength']")
          .check({ force: true });
        cy.get(minTextBox).type(parameter[i].minLength);
      }
      if ('maxLength' in parameter[i]) {
        const maxTextBox = `#complex-property-maxlength-${ i - 1 }`;
        cy.get('fieldset')
          .eq(j)
          .children('formly-field')
          .children('formly-group')
          .children('formly-field')
          .children('c8y-field-checkbox')
          .children('label')
          .children("input[id*='requiredMaxLength']")
          .check({ force: true });
        cy.get(maxTextBox).type(parameter[i].maxLength);
      }
      if ('regExp' in parameter[i]) {
        const regExpTextBox = `#complex-property-regex-${ i - 1 }`;
        cy.get('fieldset')
          .eq(j)
          .children('formly-field')
          .children('formly-group')
          .children('formly-field')
          .children('c8y-field-checkbox')
          .children('label')
          .children("input[id*='requiredRegex']")
          .check({ force: true });
        cy.get(regExpTextBox).type(parameter[i].regExp);
      }
    } else if ('type' in parameter[i] && parameter[i].type === 'Number') {
      cy.get(property_library_page_elements.typeDropdown)
        .eq(i - 1)
        .click({ force: true });
      cy.contains('Number').click();
      if ('defaultValue' in parameter[i]) {
        const defaultValueTextBox = `#complex-property-defaultValue-${ i - 1 }`;
        cy.get(defaultValueTextBox).type(parameter[i].defaultValue);
      }
      if ('minimum' in parameter[i]) {
        const minTextBox = `#complex-property-min-${ i - 1 }`;
        cy.get('fieldset')
          .eq(j)
          .children('formly-field')
          .children('formly-group')
          .children('formly-field')
          .children('c8y-field-checkbox')
          .children('label')
          .children("input[id*='requiredMinimum']")
          .check({ force: true });
        cy.get(minTextBox).type(parameter[i].minimum);
      }
      if ('maximum' in parameter[i]) {
        const maxTextBox = `#complex-property-max-${ i - 1 }`;
        cy.get('fieldset')
          .eq(j)
          .children('formly-field')
          .children('formly-group')
          .children('formly-field')
          .children('c8y-field-checkbox')
          .children('label')
          .children("input[id*='requiredMaximum']")
          .check({ force: true });
        cy.get(maxTextBox).type(parameter[i].maximum);
      }
    } else if ('type' in parameter[i] && parameter[i].type === 'File Upload') {
      cy.get(property_library_page_elements.typeDropdown)
        .eq(i - 1)
        .click({ force: true });
      cy.contains('File Upload').click();
      if ('allowedFileTypes' in parameter[i]) {
        const allowedFileTypesTextBox = `#complex-property-fileUpload-${ i - 1 }`;
        cy.get(allowedFileTypesTextBox).type(parameter[i].allowedFileTypes);
      }
      if ('fileMaxSize' in parameter[i]) {
        const fileSizeTextBox = `#complex-property-file-max-size-${ i - 1 }`;
        cy.get(fileSizeTextBox).type(parameter[i].fileMaxSize);
      }
    } else if ('type' in parameter[i] && parameter[i].type === 'Date Picker') {
      cy.get(property_library_page_elements.typeDropdown)
        .eq(i - 1)
        .click({ force: true });
      cy.contains('Date Picker').click();
    } else if ('type' in parameter[i] && parameter[i].type === 'Enumeration') {
      cy.get(property_library_page_elements.typeDropdown)
        .eq(i - 1)
        .click({ force: true });
      cy.contains('Enumeration').click();
      if ('values' in parameter[i]) {
        const valuesTextBox = `#complex-property-enum-${ i - 1 }`;
        cy.get(valuesTextBox).type(parameter[i].values);
      }
    } else if ('type' in parameter[i] && parameter[i].type === 'Boolean') {
      cy.get(property_library_page_elements.typeDropdown)
        .eq(i - 1)
        .click({ force: true });
      cy.contains('Boolean').click();
    }
  }
  cy.get(property_library_page_elements.saveNewPropertyButton).click();
  cy.get('.alert.animated.fadeInRightBig.m-t-16.interact.alert-success')
    .contains(`Asset property '${ parameter[0].label }'added successfully!`)
    .should('not.exist');
});

Cypress.Commands.add('clickOnCustomProperty', (propertyLabel) => {
  cy.get(`button[title='${propertyLabel}']`).should('be.visible').click({ force: true });
});

Cypress.Commands.add('apiCreateAssetProperty', reqObj => {
  cy.apiRequest({
    method: 'POST',
    url: '/inventory/managedObjects',
    body: reqObj
  })
    .its('status')
    .should('eq', 201);
});

Cypress.Commands.add('apiDeleteAssetProperty', (assetProperty) => {
  cy.apiRequest({
    method:'GET',
    url:`/inventory/managedObjects?query=$filter=((has(c8y_JsonSchema)) and (has(c8y_IsAssetProperty)) and ('label' eq '${assetProperty}'))`,
    failOnStatusCode: false
}).then((response:any) => {
  const propertyId = response.body.managedObjects[0].id;
    cy.apiRequest({
      method: 'DELETE',
      url: `inventory/managedObjects/${ propertyId}`,
      failOnStatusCode: false
    });
  });
});

Cypress.Commands.add('verifyAssetProperties', (property:any) => {
    cy.clickOnCustomProperty(property.label);
    cy.get(property_library_page_elements.saveNewPropertyButton).should('be.disabled');
    cy.get(property_library_page_elements.labelTextBox).should('have.value', property.label);
    cy.get(property_library_page_elements.keyTextBox).should('have.value', property.key);
    if (Object.prototype.hasOwnProperty.call(property, 'description'))
      cy.get(property_library_page_elements.descriptionTextBox).should(
        'have.value',
        property.description
      );
    if (Object.prototype.hasOwnProperty.call(property, 'complexPropertyCheckBox')) {
      cy.get(property_library_page_elements.complexPropertyCheckBox).should('exist');
      property.complexPropertyCheckBox
        ? cy.get(property_library_page_elements.complexPropertyCheckBox).should('be.checked')
        : cy.get(property_library_page_elements.complexPropertyCheckBox).should('not.be.checked');
    }
    if (Object.prototype.hasOwnProperty.call(property, 'type')) {
      if (
        typeof property.type == 'object' &&
        property.type != null &&
        !Array.isArray(property.type)
      ) {
        cy.get('c8y-form-group[class="form-group"] formly-form').then($el => {
          verifyType($el, 'property-0', property.type);
        });
      } else {
        property.type.forEach(customProp => {
          cy.get('c8y-custom-complex-property  c8y-repeat-section fieldset').each(($el, index, list) => {
            const label = $el.find(`input#complex-property-label-${ index}`).val();
            if (label == customProp.label) {
              cy.wrap($el)
                .find(`input#complex-property-key-${ index}`)
                .should('have.value', customProp.key);
              verifyType($el, index, customProp);
            }
          }
        );
      });
    }
  }
});

function verifyType($el, index, customProp) {
  switch (customProp.type) {
    case 'Text':
      verifyTypeText($el, index, customProp);
      break;
    case 'Number':
      verifyTypeNumber($el, index, customProp);
      break;
    case 'File Upload':
      verifyTypeFileUpload($el, index, customProp);
      break;
    case 'Date Picker':
      verifyTypeDatePicker($el, customProp);
      break;
    case 'Enumeration':
      verifyTypeEnum($el, index, customProp);
      break;
    case 'Boolean':
      verifyTypeBoolean($el, customProp);
      break;
  }
}

// verifies values of type Text
function verifyTypeText($el, index, customProp) {
  cy.wrap($el)
    .find('c8y-field-select .ng-value-label')
    .should('have.text', customProp.type);
  if (Object.prototype.hasOwnProperty.call(customProp, 'defaultValue'))
    cy.wrap($el)
      .find(`input#string-property-defaultValue-${ index}`)
      .should('have.value', customProp.defaultValue);
  if (Object.prototype.hasOwnProperty.call(customProp, 'minLength')) {
    customProp.minLength
      ? cy
          .wrap($el)
          .find('[title="Min Length"]')
          .prev()
          .prev()
          .should('be.checked')
      : cy
          .wrap($el)
          .find('[title="Min Length"]')
          .prev()
          .prev()
          .should('not.be.checked');
    if (Object.prototype.hasOwnProperty.call(customProp, 'minLengthValue'))
      cy.wrap($el)
        .find(`input#complex-property-minlength-${ index}`)
        .should('have.value', customProp.minLengthValue);
  }
  if (Object.prototype.hasOwnProperty.call(customProp, 'maxLength')) {
    customProp.maxLength
      ? cy
          .wrap($el)
          .find('[title="Max Length"]')
          .prev()
          .prev()
          .should('be.checked')
      : cy
          .wrap($el)
          .find('[title="Max Length"]')
          .prev()
          .prev()
          .should('not.be.checked');
    if (Object.prototype.hasOwnProperty.call(customProp, 'maxLengthValue'))
      cy.wrap($el)
        .find(`input#complex-property-maxlength-${ index}`)
        .should('have.value', customProp.maxLengthValue);
  }
  if (Object.prototype.hasOwnProperty.call(customProp, 'regExp')) {
    customProp.regExp
      ? cy
          .wrap($el)
          .find('[title="Reg Exp"]')
          .prev()
          .prev()
          .should('be.checked')
      : cy
          .wrap($el)
          .find('[title="Reg Exp"]')
          .prev()
          .prev()
          .should('not.be.checked');
    if (Object.prototype.hasOwnProperty.call(customProp, 'regExpValue'))
      cy.wrap($el)
        .find(`input#complex-property-regex-${ index}`)
        .should('have.value', customProp.regExpValue);
  }
}

// verifies values of type Number
function verifyTypeNumber($el, index, customProp) {
  cy.wrap($el)
    .find('c8y-field-select .ng-value-label')
    .should('have.text', customProp.type);
  if (Object.prototype.hasOwnProperty.call(customProp, 'defaultValue'))
    cy.wrap($el)
      .find(`input#complex-property-defaultValue-${ index}`)
      .should('have.value', customProp.defaultValue);
  if (Object.prototype.hasOwnProperty.call(customProp, 'minimum')) {
    customProp.minimum
      ? cy
          .wrap($el)
          .find('[title="Minimum"]')
          .prev()
          .prev()
          .should('be.checked')
      : cy
          .wrap($el)
          .find('[title="Minimum"]')
          .prev()
          .prev()
          .should('not.be.checked');
    if (Object.prototype.hasOwnProperty.call(customProp, 'minimumValue'))
      cy.wrap($el)
        .find(`input#complex-property-min-${ index}`)
        .should('have.value', customProp.minimumValue);
  }
  if (Object.prototype.hasOwnProperty.call(customProp, 'maximum')) {
    customProp.maximum
      ? cy
          .wrap($el)
          .find('[title="Maximum"]')
          .prev()
          .prev()
          .should('be.checked')
      : cy
          .wrap($el)
          .find('[title="Maximum"]')
          .prev()
          .prev()
          .should('not.be.checked');
    if (Object.prototype.hasOwnProperty.call(customProp, 'maximumValue'))
      cy.wrap($el)
        .find(`input#complex-property-max-${ index}`)
        .should('have.value', customProp.maximumValue);
  }
}

// verifies values of type File Upload
function verifyTypeFileUpload($el, index, customProp) {
  cy.wrap($el)
    .find('c8y-field-select .ng-value-label')
    .should('have.text', customProp.type);
  if (Object.prototype.hasOwnProperty.call(customProp, 'fileUploadTypes')) {
    cy.wrap($el)
      .find(`#complex-property-fileUpload-${ index}`)
      .should('have.value', customProp.fileUploadTypes);
  }
  if (Object.prototype.hasOwnProperty.call(customProp, 'maxFileSize')) {
    cy.wrap($el)
      .find(`#complex-property-file-max-size-${ index}`)
      .should('have.value', customProp.maxFileSize);
  }
}

// verifies values of type Date Picker
function verifyTypeDatePicker($el, customProp) {
  cy.wrap($el)
    .find('c8y-field-select .ng-value-label')
    .should('have.text', customProp.type);
}

// verifies values of type Enumeration
function verifyTypeEnum($el, index, customProp) {
  cy.wrap($el)
    .find('c8y-field-select .ng-value-label')
    .should('have.text', customProp.type);
  if (Object.prototype.hasOwnProperty.call(customProp, 'enumValues'))
    cy.wrap($el)
      .find(`#complex-property-enum-${ index}`)
      .should('have.value', customProp.enumValues);
}

// verifies values of type Boolean
function verifyTypeBoolean($el, customProp) {
  cy.wrap($el)
    .find('c8y-field-select .ng-value-label')
    .should('have.text', customProp.type);
  if (Object.prototype.hasOwnProperty.call(customProp, 'booleanChecked')) {
    if (customProp.booleanChecked) {
      if (customProp.booleanChecked == 'indeterminate') {
        cy.wrap($el)
          .find('[title="Default Value"]')
          .prev()
          .prev()
          .then($ele => {
            if ($ele.is(':indeterminate')) {
              expect(true).to.be.true;
            }
          });
      } else {
        cy.wrap($el)
          .find('[title="Default Value"]')
          .prev()
          .prev()
          .should('be.checked');
      }
    } else {
      cy.wrap($el)
        .find('[title="Default Value"]')
        .prev()
        .prev()
        .should('not.be.checked');
    }
  }
}
