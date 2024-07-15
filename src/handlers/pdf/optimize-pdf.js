'use strict';

const os = require('os');
const path = require('path');
const {v4: uuid} = require('uuid');
const {psToPdf} = require('../../services/pdf/convert-to-html');

const optimizePdf = (req, __res, next) => {
  req.debug('Optimizing PDF');
  const outputPath = path.join(os.tmpdir(), `${uuid()}.pdf`);
  req.cleanup.push(outputPath);
  psToPdf(req.filePath, outputPath, (err, filePath) => {
    if (err) {
      return next(err);
    }
    if (!filePath) {
      return next(new Error('Optimized PDF not found'));
    }
    req.filePath = filePath;
    req.optimizedPdf = true;
    next();
  });
};

module.exports = {optimizePdf};
