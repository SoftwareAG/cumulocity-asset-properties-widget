export default {
  // #################[Buttons]############

  addCustomPropertyButton: "button[title='Add asset property']",
  saveNewPropertyButton: "button[title='Save']",
  cancelNewPropertyButton: "button[title='Cancel']",
  deletePropertyButton: "button[title='Delete']",
  addPropertyButton: "button[title='Add']",
  exportPropertiesButton: "button[title='Export asset properties']",
  exportPropertiesHeading: "c8y-data-grid[data-cy='export-properties-grid']",
  exportButton: "button[data-cy='export-properties-export-btn']",
  cancelButton: 'button[data-cy="export-properties-cancel-btn"]',
  keyValidationMessage: 'c8y-messages[data-cy="manage-property-key-validation-error"]',

  // ################[Text Boxes]###########

  labelTextBox: "input[formcontrolname='label']",
  keyTextBox: "input[formcontrolname='name']",
  descriptionTextBox: "textarea[formcontrolname='description']",
  filterTextBox: "input[placeholder='Filter properties…']",

  // ################[Dropdowns]############

  typeDropdown: "div[aria-haspopup='listbox']",
  typeText: "div[aria-haspopup='listbox']>input[type='text']",

  // ################[Check Boxes]##########

  complexPropertyCheckBox: "label[title='Complex property']>input[type='checkbox']",
  booleanCheckbox: "input[id*='boolean']",
  minLengthCheckbox: "input[data-cy='c8y-field-checkbox--Min Length']",
  maxLengthCheckbox: "input[data-cy='c8y-field-checkbox--Max Length']",
  regExpCheckbox: "input[data-cy='c8y-field-checkbox--RegExp']",
  minimumCheckbox: "input[data-cy='c8y-field-checkbox--Minimum']",
  maximumCheckbox: "input[data-cy='c8y-field-checkbox--Maximum']",
  booleanDefaultValueCheckbox: "input[data-cy='c8y-field-checkbox--Default Value']",

  // ################[Others]###############

  propertyList: "button.c8y-stacked-item span[class*='text-truncate']"
};
