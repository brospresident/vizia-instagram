'use strict';
/**
 * Destination config.
 * Include any run-time options you want to pass to the destination here.
 */
module.exports = {
    color: '#ED765E',
    getComputedProps: (config) => { // getComputed props runs at run time, and has access to the provided app config from controls
        const props = config.scene.options; //get control properties
        return {
            something: props.someProperty
        }; //return an object with the required computed properties for the destination instance
    }
};
