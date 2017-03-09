'use strict';

var chalk = require('chalk');
var path = require('path');

function WebpackKarmaDieHardPlugin(options) {
  if (typeof(options) === "undefined") {
    options = {};
  }
  chalk.enabled = options.colors !== false
}

WebpackKarmaDieHardPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function(stats) {
    // Need to report warnings and errors manually, since these will not bubble
    // up to the user.
    stats.compilation.warnings.forEach(function (warning) {
      if (warning.file) {
        console.warn(chalk.yellow("WARNING in ./"
          + path.relative("", warning.file)));
      }
      console.warn(chalk.yellow(warning.message || warning));
    });
    stats.compilation.errors.forEach(function (error) {
      if (error.file) {
        console.error(chalk.red("ERROR in ./"
          + path.relative("", error.file)));
      }
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
