'use strict';

const fs = require('fs/promises');
const _ = require('lodash');

const cleanup = (req, res, next) => {
  res.on('finish', () => {
    if (!req.cleanup || !req.cleanup.length) {
      return;
    }

    // Cleanup all files.
    _.each(req.cleanup, async (file) => {
      try {
        await fs.unlink(file);
      }
      catch (err) {
        req.debug(`Can't delete file: '${err.message || err}`);
      }
    });
  });
  return next();
};

module.exports = {cleanup};
