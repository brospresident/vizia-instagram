'use strict'
const axios = require('axios');
const { platforms,
    buildJson,
    validateAccount,
    writeManifest }  = require('../manifestWriter');

const __API_ADDR = 'http://localhost:6001/googledatastudio?method=profiles_aggregated_metrics';
// const __API_ADDR = 'https://api.socialinsider.io/googledatastudio?method=profiles_aggregated_metrics';

const platformsAlias = {
    'facebook': 'fb',
    'instagram': 'ig',
    'tiktok': 'tk',
    'linkedin': 'li',
    'twitter': 'tw',
    'youtube': 'yt'
}

module.exports = (options = {}) => {
    return {
        source(pipeline) {
            const props = pipeline.config.scene.options; 
            const {key, profile, project} = props;

            let platform = 'instagram';
            const url = `${__API_ADDR}&key=${key}&project=${project}&platform=${platformsAlias[platform]}&profiles=[{%22id%22:%22${profile}%22,%22platform%22:%22${platformsAlias[platform]}%22}]`;
            console.log(url);

            axios(url)
                .then(response => response.data)
                .then((response) => {
                    response = response.benchmark_data.filter(r => r.name === profile)[0];
                    console.log(response);
                    pipeline.push(response);
                    pipeline.done();
                });
        }
    }
}