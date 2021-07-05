'use strict';

const formidable = require('formidable');

/**
 * Express middleware.
 * Extracts file from multipart/formdata request, saves it to the default temp directory
 * and sets request's filepath property to the path to the file.
 * @param req
 * @param res
 * @param next
 */
const getFileFromFormData = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, __, files) => {
    if (err) {
      res.status(400).send(err);
    }
    if (!files.pdf) {
      res.status(400).send('No files were uploaded');
    }
    req.filePath = files.pdf.path;
    next();
  });
};

module.exports = getFileFromFormData;
