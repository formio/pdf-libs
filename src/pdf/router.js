'use strict';

const r = require('express').Router();

const {
  getFileFromFormData,
  hideFormfields,
  optimizePdf,
  convertToHtml,
  getFormfields,
  cleanup
} = require('./middleware');

r.use(getFileFromFormData);

// r.post('/pdf2html', hideFormfields, optimizePdf, convertToHtml);
r.post('/pdf2html', hideFormfields, convertToHtml, cleanup);
r.post('/pdf2json', getFormfields, cleanup);

module.exports = r;
