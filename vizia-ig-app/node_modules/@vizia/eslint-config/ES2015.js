/* eslint quote-props: 0 */

'use strict';

module.exports = {
    extends: './index.js',
    env: {
        es6: true
    },
    rules: {
        'no-var': 'error',
        'no-loop-func': 'off',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-reflect': 'off',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'require-yield': 'error',
        'rest-spread-spacing': ['error', 'never'],
        'sort-imports': 'off',
        'template-curly-spacing': ['error', 'never'],
        'yield-star-spacing': ['error', 'after']
    }
};
