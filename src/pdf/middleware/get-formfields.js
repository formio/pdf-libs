'use strict';

const {extractFormfields} = require('../services/formfields');

const getFormfields = async (req, res) => {
  try {
    const jsonOutput = await extractFormfields(req.filePath);
    res.json(jsonOutput);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getFormfields;
