'use strict';

const {generateJson} = require('../converters/pdf2json');

const pdfToJson = async (req, res) => {
  try {
    const jsonOutput = await generateJson(req.filePath);
    res.json(jsonOutput);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = pdfToJson;
