'use strict';

const os = require('os');
const path = require('path');
const {v4: uuid} = require('uuid');
const {psToPdf} = require('../services/convert-to-html');

const optimizePdf = (req, res, next) => {
  req.debug('Optimizing PDF');
  const outputPath = path.join(os.tmpdir(), `${uuid()}.pdf`);
  req.cleanup.push(outputPath);
  psToPdf(req.filePath, outputPath, (err, filePath) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!filePath) {
      res.status(500).send('Error when optimizing PDF file');
    }
    req.filePath = filePath;
    req.optimizedPdf = true;
    next();
  });
};

module.exports = optimizePdf;
