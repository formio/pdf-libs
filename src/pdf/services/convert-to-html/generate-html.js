'use strict';

const {spawn} = require('child_process');

const {pdf2htmlexPath, htmlGenerationTimeout} = require('../../../../config');

const generateHtml = async (filePath, toFile, params, commands) => {
  // try {
  const {zoom, dpi} = params;
  const args = commands.concat([
    '--no-drm',
    '1',
    '--process-outline',
    '0',
    '--data-dir',
    `${__dirname}/data-dir`,
    '--zoom',
    zoom,
    // '--dpi',
    // dpi,
    // '--quiet',
    // '1',
    filePath,
    toFile
  ]);
  return new Promise((resolve, reject) => {
    spawn(pdf2htmlexPath, args, {timeout: htmlGenerationTimeout})
      .on('close', (code) => {
        if (code === 0) {
          resolve(toFile);
        } else {
          reject(new Error('ERROR: Converting pdf to html'));
        }
      })
      .on('error', (err) => {
        reject(err.message || err, null);
      });
  });
};

module.exports = generateHtml;
