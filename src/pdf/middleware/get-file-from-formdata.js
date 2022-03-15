'use strict';

const formidable = require('formidable');

const getFileFromFormData = (req, res, next) => {
  const form = new formidable.IncomingForm();
  console.log(form);
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
    console.log(req.filePath);
    next();
  });
};

module.exports = getFileFromFormData;
