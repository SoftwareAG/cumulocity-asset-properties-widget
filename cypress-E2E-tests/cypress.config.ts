import { defineConfig } from 'cypress';
const { isFileExist, findFiles } = require('cy-verify-downloads');

export default defineConfig({
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 20000,
  retries: 0,
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
    specPattern: 'cypress/integration/*.ts',
    baseUrl: 'https://dtmsecurity.latest.stage.c8y.io',
    env: {
      username: 'autouser',
      password: 'Autouser21@'
    }
  }
});
