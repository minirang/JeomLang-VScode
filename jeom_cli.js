#!/usr/bin/env node
/**
 * Back-compat entry: runs official/cli.js
 */
if (require.main === module) {
  require('./official/cli.js');
} else {
  module.exports = require('./official/cli.js');
}
