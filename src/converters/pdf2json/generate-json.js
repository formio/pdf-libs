'use strict';

const config = require('../../config');

const {exec} = require('child_process');
const {promisify} = require('util');
const execPromisified = promisify(exec);

/**
 * generateJson function performs pdf to formio conversion
 * by executing poppler-pdf-to-json cli application (https://gitlab.com/formio/pdf-to-json)
 * and returns object representing converted form.
 * @param {string} filePath
 * @returns {Promise<object>}
 */
const generateJson = async (filePath) => {
  return JSON.parse((await execPromisified(
    `${config.popplerPdfToJsonPath} ${filePath}`,
    {maxBuffer: 1024 * 1024 * 1024}
  )).stdout);
};

module.exports = generateJson;
