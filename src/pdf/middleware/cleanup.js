'use strict';

const fs = require('fs-extra');
const _ = require('lodash');
module.exports = (req, __res, next) => {
  if (!req.cleanup || !req.cleanup.length) {
    return next();
  }

  // Cleanup all files.
  _.each(req.cleanup, (file) => {
    try {
      console.log(`Deleting file ${file}`);
      fs.unlink(file);
    } catch (err) {
      console.log(`ERROR: Deleting File ${err.message || err}`);
      console.log(err);
    }
  });
  return next();
};
