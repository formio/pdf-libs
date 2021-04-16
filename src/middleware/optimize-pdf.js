'use strict';

const os = require('os');
const path = require('path');
const {v4: uuid} = require('uuid');
const {psToPdf} = require('../converters/ps2pdf');

const optimizePdf = (req, res, next) => {
  const outputPath = path.join(os.tmpdir(), `${uuid()}.pdf`);
  psToPdf(req.filePath, outputPath, (err, filePath) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!filePath) {
      res.status(500).send('Error when optimizing PDF file');
    }
    req.filePath = filePath;
    next();
  });
};

module.exports = optimizePdf;
