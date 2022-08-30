const path = require('path');
const acqConfigs = require('@folio/stripes-acq-components/jest.config');

module.exports = {
  ...acqConfigs,
  testEnvironment: 'jsdom',
  resolver: path.join(__dirname, './test/jest/resolver.js'),
};
