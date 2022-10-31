# Vizia ESLint Config

Common ESLint [shareable config][1] files for Vizia.

Install into your project:

```
npm install --save eslint @vizia/eslint-config
```

# Example uses:

## ES5 browser project.

Make a `.eslintrc.json` config file with the following in:

```javascript
{
    "env": {
        "browser": true
    }
    "extends": "@vizia/eslint-config"
}
```

You must specify your environment in the `"env"` part. You can also customize
rules as you like.

[1]: http://eslint.org/docs/developer-guide/shareable-configs

## ES2015 Node.js project.

As before the environment needs to be specified. Since Node 6+ has good ES2015
feature coverage, it makes sense to use ES2015 features. A sharable config is
provided for ES2015 code:

```javascript
{
    "env": {
        "node": true
    }
    "extends": "@vizia/eslint-config/ES2015"
}
```

Internally this config extends the base vizia config.

## Tests

Tests often look like bad code. They're prone to many more lines of code per
file than healthy production code etc. It's recommended to have a
`.eslintrc.json` file in your test directory to address this. ESLint extends a
config found in a directory above automatically, so you only need to turn off
rules that become noisy in tests. Such a file might look like:

```javascript
{
    "env": {
        "mocha": true
    },
    "rules": {
        "max-statements": 'off',
        "max-lines": 'off'
    }
}
```
