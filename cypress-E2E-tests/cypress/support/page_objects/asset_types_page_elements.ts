export default {
  //################[Buttons]#################
  addAssetTypeButton: "button[title='Add asset model']",
  deleteSelectedItemsButton: "button.btnbar-btn[title='Delete']",
  cancelSelectedItemsButton: "button[title='Cancel']",
  saveAssetTypeButton: '.card-footer.separator.sticky-bottom>.btn.btn-primary',
  cancelAssetTypeButton: '.card-footer.separator.sticky-bottom>button.btn.btn-default',
  filterApplyButton: "button[title='Apply']",
  filterResetButton: "button[title='Reset']",
  deleteAssetTypeConfirmButton: "button[title='Confirm']",
  deleteAssetTypeCancelButton: "button[title='Cancel']",
  addChildAssetTypeButton:
    "div[class*='inner-scroll'] c8y-ui-empty-state[icon='c8y-enterprise']~button",
  addCustomPropertyButton: "div[class*='inner-scroll'] c8y-ui-empty-state[icon='sliders']~button",
  selectIconButton: '.asset-type-icon.m-b-8.text-muted.dlt-c8y-icon-no-image+button',
  saveButtonSelectIconWindow: '.modal-footer.separator.text-center>.btn.btn-primary',
  cancelButtonSelectIconWindow: '.modal-footer.separator.text-center>.btn.btn-default',
  changeIconButton: '.dtm-icon-display>.btn.btn-default.btn-xs.showOnHover',
  newCustomPropertyButton: '#static-options~ng-dropdown-panel .btn.btn-default.btn-sm',
  deletionWarningAlert: 'c8y-alert-outlet div div strong[class="message"]',
  removeButton: '[c8yicon="minus-circle"]',
  exportAssetModelsButton: "button[title='Export asset models']",
  exportButton: 'button[data-cy="export-asset-models-export-btn"]',
  cancelButton: 'button[data-cy="export-asset-models-cancel-btn"]',
  exportAssetModelHeading: 'c8y-tree-view[data-cy="export-asset-models-grid"] div[id="treeTitle"]',
  keyValidationMessage: 'c8y-messages[data-cy="manage-asset-model-key-validation-error"]',

  //################[Text Boxes]##############
  labelTextBox: "input[formcontrolname='label']",
  keyTextBox: "input[formcontrolname='name']",
  descriptionTextBox: "textarea[formcontrolname='description']",
  filterTextBox: 'c8y-filtering-form-renderer>div>input',

  //#################[Dropdowns]##############
  selectAssetTypeDropdown: "div[aria-haspopup='listbox']",
  selectCustomPropertyDropdown: "div[aria-haspopup='listbox']",

  //#################[Check Box]##############
  isRequiredCheckBox: "input[type='checkbox']",

  assetTypeChildren: 'c8y-manage-asset-type .text-medium.m-b-4',
  childAssetPropertyDefaultIcon: '.dlt-c8y-icon-sliders'
};
