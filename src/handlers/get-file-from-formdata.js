'use strict';

const formidable = require('formidable');
const {ValidationError} = require('../errors');

const getFileFromFormData = (req, __res, next) => {
  const form = new formidable.IncomingForm();
  req.cleanup = [];
  form.parse(req, async (err, __, files) => {
    if (err) {
      return next(new ValidationError(err?.message ?? err));
    }
    if (!files.pdf) {
      return next(new ValidationError('No files were uploaded'));
    }
    req.filePath = files.pdf[0].filepath;
    req.cleanup.push(req.filePath);
    next();
  });
};

module.exports = {getFileFromFormData};
