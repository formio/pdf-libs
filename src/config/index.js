'use strict';

/* eslint-disable no-console */

require('dotenv').config();

const path = require('path');

const port = process.env.PORT || 3000;

const popplerPdfToJsonPath = process.env.POPPLER_PDF_TO_JSON;

if (!popplerPdfToJsonPath) {
  console.error('POPPLER_PDF_TO_JSON must be provided');
  process.exit(1);
}

const pdf2htmlexPath = process.env.PDF2HTMLEX_PATH;

if (!pdf2htmlexPath) {
  console.error('PDF2HTMLEX_PATH must be provided');
  process.exit(1);
}

const psToPdfPath = process.env.PSTOPDF_PATH;

if (!psToPdfPath) {
  console.error('PDF2HTMLEX_PATH must be provided');
  process.exit(1);
}

module.exports = {
  port,
  popplerPdfToJsonPath: path.join(__dirname, '../../', popplerPdfToJsonPath),
  pdf2htmlexPath: path.join(__dirname, '../../', pdf2htmlexPath),
  psToPdfPath
};
