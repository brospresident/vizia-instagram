'use strict';
/**
 * you can pass an options object into your transform when instantiating the factory
 * these can then be used in your code by access `options.propName`
 */
module.exports = (options = {}) => {
    return {
        transform: (data, pipeline) => {
            const props = pipeline.config.scene.options; // get control properties
            const series = [
                {
                    id: 'stocks', // each series requires a unique ID
                    name: 'Stocks', // each series requires a name (to show in the legend)
                    x: Object.keys(data), // each series must include an X and a Y value
                    y: Object.values(data)
                }
            ];
            // chart destination must be passed an array of series (see @vizia/destination-highcharts schema)
            pipeline.push(series); // push the data down the pipeline
            pipeline.done(); // let the pipeline know that you have finished transforming the data
        }
    };
};
