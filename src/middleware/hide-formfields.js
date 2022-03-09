'use strict';

const config = require('../config');
const execPromisified = require('../utils/exec-promisified');

const hideFormfields = async (req, __res, next) => {
  await execPromisified(`${config.clearFieldsPath} ${req.filePath} ${req.filePath}`);
  next();
};

module.exports = hideFormfields;
