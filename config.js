'use strict';

/* eslint-disable no-console */

require('dotenv').config();

const port = process.env.PDFLIBS_PORT || 8080;

const pdf2htmlexPath = process.env.PDF2HTMLEX_PATH;

if (!pdf2htmlexPath) {
  console.error('PDF2HTMLEX_PATH must be provided');
  process.exit(1);
}

const psToPdfPath = process.env.PSTOPDF_PATH;

if (!psToPdfPath) {
  console.error('PSTOPDF_PATH must be provided');
  process.exit(1);
}

const extractFormfieldsPath = process.env.EXTRACT_FORMFIELDS;

if (!extractFormfieldsPath) {
  console.error('EXTRACT_FORMFIELDS must be provided');
  process.exit(1);
}

// 7 seconds (and then 30 seconds) seems like a sensible default I guess? We don't want PDFs
// that don't need postscript optimization to be optimized in this way, but we also want to
// stay under common reverse proxy timeout configurations so we don't receive a 504
const htmlGenerationTimeoutConfig = {
  timeout: parseInt(process.env.HTML_GENERATION_TIMEOUT, 10) || 7000,
  backoff: parseInt(process.env.HTML_GENERATION_BACKOFF, 10) || 23000
};

module.exports = {
  port,
  extractFormfieldsPath,
  pdf2htmlexPath,
  psToPdfPath,
  htmlGenerationTimeoutConfig
};
