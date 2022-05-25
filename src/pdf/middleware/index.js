'use strict';

const getFileFromFormData = require('./get-file-from-formdata');
const optimizePdf = require('./optimize-pdf');
const hideFormfields = require('./hide-formfields');
const convertToHtml = require('./convert-to-html');
const getFormfields = require('./get-formfields');
const cleanup = require('./cleanup');
const debug = require('./debug');

module.exports = {
  getFileFromFormData,
  optimizePdf,
  hideFormfields,
  convertToHtml,
  getFormfields,
  cleanup,
  debug
};
