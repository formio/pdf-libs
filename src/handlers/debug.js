'use strict';

const logDebug = require('debug');

const debug = (namespace) => {
  const log = logDebug(namespace);
  return (req, __res, next) => {
    req.debug = (msg) => {
      log(`${msg}`);
    };
    next();
  };
};

module.exports = {debug};
