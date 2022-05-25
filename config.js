'use strict';

/* eslint-disable no-console */

require('dotenv').config();

const port = process.env.PORT || 8080;

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

const extractFormfieldsPath = process.env.EXTRACT_FORMFIELDS;

if (!extractFormfieldsPath) {
  console.error('POPPLER_PDF_TO_JSON must be provided');
  process.exit(1);
}

const hideFormfieldsPath = process.env.HIDE_FORMFIELDS;

module.exports = {
  port,
  extractFormfieldsPath,
  pdf2htmlexPath,
  psToPdfPath,
  hideFormfieldsPath
};
