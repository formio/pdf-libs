'use strict';

/* eslint-disable no-console */

const config = require('../../config');

const os = require('os');
const {spawn} = require('child_process');
const path = require('path');

const generateHtml = (filePath, toFile, params, commands, done) => {
  try {
    const {zoom, dpi} = params;
    commands = commands.concat([
      '--no-drm',
      '1',
      '--process-outline',
      '0',
      '--data-dir',
      `${__dirname}/data-dir`,
      '--zoom',
      zoom,
      '--dpi',
      dpi,
      filePath,
      toFile
    ]);
    console.log(`${config.pdf2htmlexPath} ${commands.join(' ')}`);
    const {stdout, stderr} = spawn(config.pdf2htmlexPath, commands)
      .on('close', (code) => {
        if (code === 0) {
          done(null, toFile);
        } else {
          done(new Error('ERROR: Converting pdf to html'), null);
        }
      }).on('error', (err) => {
        done(err.message || err, null);
      });
  } catch (err) {
    done(err.message || err);
  }
};

module.exports = generateHtml;
