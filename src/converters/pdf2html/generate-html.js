'use strict';

/* eslint-disable no-console */

const config = require('../../config');

const os = require('os');
const {spawn} = require('child_process');
const path = require('path');

/**
 * generateHtml function performs pdf to html conversion
 * by executing pdf2htmlEX cli application (https://github.com/pdf2htmlEX/pdf2htmlEX)
 * and returns string representing converted html doc.
 * @param {string} filePath
 * @param {string} toFile
 * @param {object} params
 * @param {array} commands
 * @param {function(err, string)} done
 */
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
