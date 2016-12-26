Plugin for Webpack to ensure errors cause it to quit with a non-zero exit code
when used as a Karma preprocessor with the `karma-webpack` plugin. This works
around known issues in `karma-webpack`.

## Install

Installable through npm:

`npm install --save-dev webpack-karma-die-hard`

## Usage

This plugin is not necessary for building with Webpack directly, so it should
not be added to your `webpack.config.js` file. It should instead extend the
Webpack configuration used by Karma when using Webpack as a preprocessor.

Inside your `karma.conf.js` file:

```javascript
var WebpackKarmaDieHardPlugin = require('webpack-karma-die-hard');

var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    /* Karma configuration omitted for brevity... */

    preprocessors: {
      'test/**/*.ts': ['webpack']
    },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      plugins: [ new WebpackKarmaDieHardPlugin() ]
    }
  })
}
```

## Options

The plugin takes an optional options object with the following options:

* color: set to "false" to prevent colored logging to the console.
