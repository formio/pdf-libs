'use strict';

/* eslint-disable no-console */

const {pdf2htmlexPath} = require('../../../../config');
const {exec} = require('../../utils');

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
    '--dpi',
    dpi,
    '--quiet',
    '1',
    filePath,
    toFile
  ]);
  // return new Promise((resolve, reject) => {
  //   spawn(pdf2htmlexPath, args)
  //     .on('close', (code) => {
  //       if (code === 0) {
  //         resolve(toFile);
  //       } else {
  //         reject(new Error('ERROR: Converting pdf to html'));
  //       }
  //     }).on('error', (err) => {
  //       reject(err.message || err, null);
  //     });
  // });
  await exec(`${pdf2htmlexPath} ${args.join(' ')}`);
};

module.exports = generateHtml;
