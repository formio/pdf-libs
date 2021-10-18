'use strict';

const express = require('express');
const pdfRouter = express.Router();

const getFileFromFormData = require('../middleware/get-file-from-formdata');
const getFileFromBase64 = require('../middleware/get-file-from-base64');
const getFileFromS3 = require('../middleware/get-file-from-s3');

const optimizePdf = require('../middleware/optimize-pdf');
const pdfToHtml = require('../endpoints/pdf-to-html');
const pdfToJson = require('../endpoints/pdf-to-json');

pdfRouter.use(getFileFromFormData, getFileFromBase64, getFileFromS3);

pdfRouter.post('/pdf2html', pdfToHtml, optimizePdf, pdfToHtml);
pdfRouter.post('/pdf2json', pdfToJson);

module.exports = pdfRouter;
