'use strict';
/**
 * Bundle factory.
 * Do not include any references to browser APIs here (including the DOM).
 * Instead, pass the destination instance as an argument and implement anything
 * DOM-specific in ../browser.js.
 */
const Bundle = require('@vizia/bundle'); // The Vizia App SDK backbone

// const createSource = require('./create-source'); //pull in your source (this could be a node module if you have a common source for multiple apps)
const siSource = require('./si-source');

const createKeyMetricTransform = require('./create-key-metric-transform'); //pull in your transform

function createBundle(destinationInstance) {
    const bundle = new Bundle();
    // TODO: Set up your source, transforms and destination here
    bundle.setThrottle(60000); //frequency of which to update the data (in milliseconds)
    bundle.use(siSource()); //create the source here
    bundle.use(createKeyMetricTransform()); //transform the data out of your source to the destination schema
    bundle.use(destinationInstance); //destination should be configured in the browser.js file

    return bundle; //you must return your bundle
}

module.exports = createBundle; //expose a function that returns an instance of bundle
