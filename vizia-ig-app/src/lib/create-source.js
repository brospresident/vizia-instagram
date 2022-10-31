'use strict';
const axios = require('axios');
/**
 * you can pass an options object into your source when instantiating the factory
 * these can then be used in your code by access `options.propName`
 */
module.exports = (options = {}) => {
    return {
        source(pipeline) { //source factories must return an object with a function called 'source'
            const props = pipeline.config.scene.options; //get control properties
            const {yValue, stock, apikey} = props; // get the values you need from control props
            //pull your source data from a URL
            axios(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${apikey}`)
                .then(response => response.data) //get the json data from the api endpoint
                .then(jsonData => {
                    if (jsonData.Information) {
                        return pipeline.error(jsonData.Information);
                    }

                    const tabular = Object.entries(jsonData['Time Series (5min)']).reduce((acc, [date, item]) => {
                        const key = Object.keys(item).find(key => key.includes(yValue));

                        //for time data the key should be an ISO 8601 String
                        return Object.assign(acc, {[new Date(date).toISOString()]: parseFloat(item[key])});
                    }, {}); //simplify the data so that its easier to handle

                    pipeline.push(tabular); //send the data down the pipeline
                    pipeline.done(); //tell the pipeline that you have no further data to send
                });
        }
    };
};
