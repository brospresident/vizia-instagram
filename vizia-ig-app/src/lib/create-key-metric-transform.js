'use strict';

/**
 * you can pass an options object into your transform when instantiating the factory
 * these can then be used in your code by access `options.propName`
 */
module.exports = (options = {}) => {
    return {
        transform: (data, pipeline) => {
            const props = pipeline.config.scene.options; //get control properties
            const {yValue, format} = props; // get the values you need from control props
            console.log({data, pipeline});
            let keyMetric = {};
            if (!data) {
                keyMetric = {
                    label: yValue,
                    value: 0,
                    format: 'number'
                }
            }
            else {
                console.log(yValue);
                if (!yValue) {
                    pipeline.done();
                    return;
                }
                keyMetric = {
                    label: yValue.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), 
                    value: data[yValue], 
                    comparisonValue: data[`${yValue}_history`], //previous data for the comparison
                    format: yValue.includes('percent') ? 'percent' : 'number'
                };
                console.log(keyMetric);
            }
            pipeline.push(keyMetric); //push the data down the pipeline
            pipeline.done(); //let the pipeline know that you have finished transforming the data
        }
    };
};
