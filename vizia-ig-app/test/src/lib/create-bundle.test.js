'use strict';

const test = require('ava');

const createBundle = require('../../../src/lib/create-bundle');

// TODO: delete this silly test and implement some proper ones for your bundle
test.cb('Sanity check', (t) => {
    const bundle = createBundle({
        destination: (data, pipeline) => pipeline.done()
    });

    bundle.load({}).then(() => bundle.start());

    bundle.once('data', (data) => {
        t.truthy(data.date, 'Receives data');
        t.end();
    });
});
