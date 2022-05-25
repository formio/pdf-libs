'use strict';

const {extractFormfieldsPath} = require('../../../../config');

const {exec} = require('../../utils');

const extractFormfields = async (filePath) => {
  return JSON.parse((await exec(
    `${extractFormfieldsPath} ${filePath}`
  )).stdout);
};

module.exports = extractFormfields;
