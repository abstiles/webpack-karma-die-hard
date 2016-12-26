'use strict';

var chalk = require('chalk');
var path = require('path');

function WebpackKarmaDieHardPlugin(options = {}) {
  chalk.enabled = options.colors !== false
}

WebpackKarmaDieHardPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function(stats) {
    // Need to report warnings and errors manually, since these will not bubble
    // up to the user.
    stats.compilation.warnings.forEach(function (warning) {
      console.warn(chalk.yellow("WARNING: ./"
          + path.relative("", warning.module.resource)));
      console.warn(chalk.yellow(warning.message || warning));
    });
    stats.compilation.errors.forEach(function (error) {
      console.error(chalk.red("ERROR: ./"
          + path.relative("", error.module.resource)));
      console.error(chalk.red(error.message || error));
    });
    if (stats.compilation.errors.length > 0) {
      // karma-webpack will hang indefinitely if no assets are produced, so just
      // blow up noisily.
      process.exit(1);
    }
  });
};

module.exports = WebpackKarmaDieHardPlugin;
