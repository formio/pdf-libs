'use strict';

const formidable = require('formidable');

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
