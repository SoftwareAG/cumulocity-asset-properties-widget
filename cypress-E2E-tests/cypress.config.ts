import { defineConfig } from 'cypress';
const { isFileExist, findFiles } = require('cy-verify-downloads');// eslint-disable-line @typescript-eslint/no-var-requires

export default defineConfig({
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 20000,
  retries: 1,
  video: false,
  reporter: 'mochawesome',
  numTestsKeptInMemory: 10,
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', { isFileExist, findFiles });
    },
    specPattern: 'cypress/integration/*.ts'
  }
});
