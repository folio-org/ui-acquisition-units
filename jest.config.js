const path = require('path');
const acqConfigs = require('@folio/stripes-acq-components/jest.config');
const stripesConfig = require('@folio/jest-config-stripes');

module.exports = {
  ...stripesConfig,
  testEnvironment: 'jsdom',
  resolver: path.join(__dirname, './test/jest/resolver.js'),
  setupFiles: [
    ...stripesConfig.setupFiles,
    ...acqConfigs.setupFiles,
  ],
};
