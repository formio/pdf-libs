'use strict';

const path = require('path');
const {v4: uuid} = require('uuid');
const fs = require('fs');
const tmpdir = require('os').tmpdir();

const {generateHtml} = require('../services/convert-to-html');

const convertToHtml = async (req, res, next) => {
  const outputFileName = `${uuid()}.html`;
  const outputPath = path.join(tmpdir, `${outputFileName}`);
  req.cleanup.push(outputPath);
  try {
    await generateHtml(
      req.filePath,
      outputFileName,
      {
        zoom: req.query.zoom || 1.78,
        dpi: req.query.dpi || 144
      },
      ['--dest-dir', tmpdir]
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
  return res.sendFile(outputPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = convertToHtml;
