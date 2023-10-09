// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './cumulocity.commands';
import './dtm_generic.commands';
import './property_library.commands';
import './asset_types.commands';
import './assets.commands';
import './cockpit.commands';
import './asset_properties_widget.commands';

const addContext = require('mochawesome/addContext'); //eslint-disable-line

Cypress.on('test:after:run', (test, runnable) => {
  let videoName = Cypress.spec.name;
  videoName = videoName.replace('/.ts.*', '.ts');
  const videoUrl = `videos/${videoName}.mp4`;

  addContext({ test }, videoUrl);
});

Cypress.on('uncaught:exception', (err, runnable) => {
  //window.location.reload()
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on('uncaught:exception', err => {
  /* returning false here prevents Cypress from failing the test */

  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});

require('cy-verify-downloads').addCustomCommand(); //eslint-disable-line @typescript-eslint/no-var-requires

// Alternatively you can use CommonJS syntax:
// require('./commands')

function matchesPattern(str) {
  const pattern = /^https\:\/\/dtmtester1\.pm-\d+-dtm\.stage\.c8y\.io$/; //eslint-disable-line no-useless-escape
  return pattern.test(str);
}

before(function () {
  if (matchesPattern(Cypress.config('baseUrl'))) {
    cy.login();
    cy.visitAndWaitUntilPageLoad('apps/digital-twin-manager/index.html');
    cy.updateBranding();
  }
});
export {};
