'use strict';

const config = require('../../../config');
const {exec} = require('../utils');
const path = require('path');
const os = require('os');
const {v4: uuid} = require('uuid');

const hideFormfields = async (req, __res, next) => {
  const outputPath = path.join(os.tmpdir(), `${uuid()}.pdf`);
  await exec(`${config.hideFormfieldsPath} ${req.filePath} ${outputPath}`);
  req.filePath = outputPath;
  next();
};

module.exports = hideFormfields;
