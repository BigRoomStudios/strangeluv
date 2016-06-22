// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
require('babel-polyfill');
const Sinon = require('sinon');
const Chai = require('chai');
const SinonChai = require('sinon-chai');
const ChaiAsPromised = require('chai-as-promised');
const ChaiEnzyme = require('chai-enzyme');

Chai.use(SinonChai);
Chai.use(ChaiAsPromised);
Chai.use(ChaiEnzyme());

global.chai = Chai;
global.sinon = Sinon;
global.expect = Chai.expect;
global.should = Chai.should();

// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
const __karmaWebpackManifest__ = [];
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path);

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/);

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest);
(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext);

// require all `src/**/*.js` except for `main.js` (for isparta coverage reporting)
if (__COVERAGE__) {
    const componentsContext = require.context('../src/', true, /^((?!main).)*\.js$/);
    componentsContext.keys().forEach(componentsContext);
}
