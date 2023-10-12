export default {
  //###############[Buttons]##############
  addAssetButton: "button[title='Add asset']",
  cancelButton: '.card-footer.separator.sticky-bottom>.btn.btn-default',
  nextButton: '.card-footer.separator.sticky-bottom>.btn.btn-primary',
  assignDeviceButton: '.dlt-c8y-icon-link',
  createButton: '.card-footer.separator.sticky-bottom>.btn.btn-primary:nth-child(3)',
  previousButton: '.card-footer.separator.sticky-bottom>.btn.btn-primary:nth-child(2)',
  reloadButton: "button[title='Reload']",
  assignDeviceButtonSubAssets: "button[title='Assign devices']",
  alertPopupCancelButton: ".alert-footer>button[title='Cancel']",
  childAssetsPageNextButton: '.sticky-bottom > :nth-child(3)',
  addChildAssetButton: "button[title='Add asset']",
  searchButton: "button i[c8yicon='search']",
  goToAssetDataTableButton: "button[title='Go to the asset data table']",
  startswithButton: "#searchDropdown button[title='Starts with']",
  containsButton: "#searchDropdown button[title='Contains']",
  endswithButton: "#searchDropdown button[title='Ends with']",
  assetTreeViewButton: "a[title='Asset tree']",
  subAssetsButton: "ul a[title='Subassets']",
  assignButtonInAssignDeviceWindow: "c8y-device-grid~div button[title='Assign']",
  addButton: "button[title='Add']",
  expandAllButton: "#treeTitle~div button[title='Expand all']",
  collapseAllButton: "#treeTitle~div button[title='Collapse all']",
  removeIntanceButton: "fieldset button[type='button'] i[c8yicon='minus-circle']",
  enableChildDeviceButton: "label[class*='c8y-switch']",
  targetChildDevicesButton: "button[aria-label*='child devices'] i",
  cancelButtonAssignDeviceWindow: "c8y-device-grid~div button[title='Cancel']",
  deletionWarningCommonMessage: 'strong[data-cy="asset-model-deletion-warning"]',
  deletionWarningIcon: 'button[data-cy="asset-model-deletion-more-info-icon"]',
  deletionWarningInHierarchy: 'small[data-cy="asset-hierarchy-property-deletion-warning"]',
  moveSelectedButton: "button[title='Move selected']",
  deleteButton: "button[title='Delete']",
  assetsCancelButton: "button[title='Cancel']",
  assetMovementHelpIcon: 'button[class*="btn-help btn-help--over-dark"]',
  assetMovementHelpMessage:
    'popover-container[role="tooltip"] div[class="popover-content popover-body"]',
  assetsMoveButton: 'button[data-cy="assets-move-button"]',
  confirmButton: 'button[data-cy="c8y-confirm-modal--ok"]',
  assignButtonInChildDeviceWindow: "c8y-assign-child-devices button[title='Assign']",
  cancelButtonInChildDeviceWindow: "c8y-assign-child-devices button[title='Cancel']",

  //###############[Dropdowns]############
  chooseAssetTypeDropdown: '.c8y-select-wrapper.fit-w>ng-select',

  //###############[Textbox]##############
  datePicker: "input[id*='date']",
  searchTextBox: "#searchDropdown input[type='text']"
};
