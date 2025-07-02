'use strict';

const r = require('express').Router();
const debugScopes = require('./debug-scopes');

const {
  getFileFromFormData,
  optimizePdf,
  convertToHtml,
  getFormfields,
  cleanup,
  debug
} = require('./handlers');

r.use(cleanup);
r.use(getFileFromFormData);

r.post('/convertToHtml',
  debug(debugScopes.CONVERT_TO_HTML),
  convertToHtml,
  optimizePdf,
  convertToHtml);

r.post('/getFormfields', debug('pdfLibs.formfields'), getFormfields);

// DEPRECATED PATHS
r.post('/pdf2html',
  debug(debugScopes.FORMFIELDS),
  convertToHtml,
  optimizePdf,
  convertToHtml);

r.post('/pdf2json', debug('pdfLibs.formfields'), getFormfields);

module.exports = r;
