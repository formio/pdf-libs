'use strict';

const path = require('path');
const os = require('os');
const {v4: uuid} = require('uuid');

const config = require('../../../config');
const {exec} = require('../../utils');

const hideFormfields = async (req, __res, next) => {
  const outputPath = path.join(os.tmpdir(), `${uuid()}.pdf`);
  req.cleanup.push(outputPath);

  await exec(`${config.hideFormfieldsPath} ${req.filePath} ${outputPath}`);
  req.filePath = outputPath;
  next();
};

module.exports = {hideFormfields};
