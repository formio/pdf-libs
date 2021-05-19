'use strict';

const path = require('path');
const {v4: uuid} = require('uuid');
const fs = require('fs');

const {generateHtml} = require('../converters/pdf2html');

const pdfToHtml = (req, res) => {
  const outputPath = path.join('pdf2html_tmpdir', `${uuid()}.html`);
  generateHtml(
    req.filePath,
    outputPath,
    {
      zoom: req.query.zoom || 1.78,
      dpi: req.query.dpi || 144
    },
    [],
    (err, fileName) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!fileName) {
        res.status(500).send(new Error('Error when converting to html'));
      }
      const resolvedFilePath = path.resolve(__dirname, '../../', fileName);
      res.sendFile(resolvedFilePath, null, (err) => {
        if (err) {
          console.log(err);
        }
        fs.unlink(resolvedFilePath, () => {});
      });
    }
  );
};

module.exports = pdfToHtml;
