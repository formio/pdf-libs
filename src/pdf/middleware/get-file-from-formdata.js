'use strict';

const formidable = require('formidable');

const getFileFromFormData = (req, res, next) => {
  const form = new formidable.IncomingForm();
  req.cleanup = [];
  form.parse(req, async (err, __, files) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    if (!files.pdf) {
      console.log('No files were uploaded');
      res.status(400).send('No files were uploaded');
    }
    req.filePath = files.pdf.path;
    req.cleanup.push(files.pdf.path);
    next();
  });
};

module.exports = getFileFromFormData;
