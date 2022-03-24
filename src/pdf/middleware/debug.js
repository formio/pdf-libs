'use strict';

const debug = require('debug');

module.exports = (namespace) => {
  const log = debug(namespace);
  return (req, __res, next) => {
    req.debug = (msg) => {
      log(`${msg}`);
    };
    next();
  };
};
