'use strict';
/**
 * This is where to include any source or libraries that use browser APIs.
 */
const createBundle = require('./lib/create-bundle');
const destinationConfig = require('./lib/destination-config');
const createDestination = require('@vizia/destination-key-metric');

const bundle = createBundle(createDestination(destinationConfig));

module.exports = bundle;
