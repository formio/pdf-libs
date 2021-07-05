'use strict';

const {generateJson} = require('../converters/pdf2json');

/**
 * Express endpoint.
 * Converts pdf file with formfields to the Formio form
 * containing only `components` property
 * with all formfields from the original document.
 * Accepts file from req.filepath
 * and sends converted form in response.
 * @param req
 * @param res
 */
const pdfToJson = async (req, res) => {
  try {
    const jsonOutput = await generateJson(req.filePath);
    res.json(jsonOutput);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = pdfToJson;
