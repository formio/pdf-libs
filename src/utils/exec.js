'use strict';

const util = require('util');

module.exports = {
  exec: util.promisify(require('child_process').exec)
};
