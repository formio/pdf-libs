'use strict';

const path = require('path');
const {v4: uuid} = require('uuid');
const tmpdir = require('os').tmpdir();

const {generateHtml} = require('../services/convert-to-html');
const {htmlGenerationTimeoutConfig} = require('../../../config');

const convertToHtml = async (req, res, next) => {
  const outputFileName = `${uuid()}.html`;
  const outputPath = path.join(tmpdir, `${outputFileName}`);
  req.cleanup.push(outputPath);
  const {timeout, backoff} = htmlGenerationTimeoutConfig;
  const calculatedTimeout = req.optimizedPdf ? timeout + backoff : timeout;
  try {
    await generateHtml(
      req.filePath,
      outputFileName,
      {
        zoom: req.query.zoom || 1.78,
        dpi: req.query.dpi || 144
      },
      ['--dest-dir', tmpdir],
      calculatedTimeout
    );
  }
  catch (err) {
    return req.optimizedPdf
      ? res.status(500).send(err)
      : next();
  }
  return res.sendFile(outputPath, (err) => {
    if (err) {
      req.debug(err);
    }
  });
};

module.exports = convertToHtml;
