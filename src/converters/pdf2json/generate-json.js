'use strict';

const config = require('../../config');

const {exec} = require('child_process');
const {promisify} = require('util');
const execPromisified = promisify(exec);

const generateJson = async (filePath) => {
  return JSON.parse((await execPromisified(
    `${config.popplerPdfToJsonPath} ${filePath}`,
    {maxBuffer: 1024 * 1024 * 1024}
  )).stdout);
};

module.exports = generateJson;
