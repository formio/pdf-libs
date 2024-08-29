'use strict';

const {extractFormfields} = require('../../services/pdf/formfields');

const getFormfields = async (req, res, next) => {
  try {
    const jsonOutput = await extractFormfields(req.filePath);
    res.json({});
  }
  catch (err) {
    return next(err);
  }
};

module.exports = {getFormfields};
