'use strict';

const {extractFormfieldsPath} = require('../../../../config');

const {exec} = require('../../utils');

const extractFormfields = async (filePath) => {
  return JSON.parse((await exec(
    `${extractFormfieldsPath} ${filePath}`,
    {
      maxBuffer: 1024 * 1024 * 50 // 50mb
    }
  )).stdout);
};

module.exports = extractFormfields;
