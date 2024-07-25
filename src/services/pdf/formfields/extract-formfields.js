'use strict';

const {extractFormfieldsPath} = require('../../../../config');
const {exec} = require('../../../utils');

const extractFormfields = async (filePath) => {
  const result = await exec(
    `${extractFormfieldsPath} ${filePath}`,
    {
      maxBuffer: 1024 * 1024 * 50 // 50mb
    }
  );
  return JSON.parse(result.stdout);
};

module.exports = {extractFormfields};
