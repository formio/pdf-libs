'use strict';

const {spawn} = require('child_process');
const {psToPdfPath} = require('../../../../config');
const os = require('os');

const psToPdf = (filePath, toFile, done) => {
  try {
    // req.debug(`Optimizing PDF ${req.file.path}`);
    const commands = [
      '-dPDFSETTINGS=/default',
      '-dUseFlateComprassion=true',
      filePath,
      toFile
    ];

    // req.debug(`${config.psToPdf} ${commands.join(' ')}`);
    // req.cleanup.push(filePath);
    spawn(psToPdfPath, commands, {
      cwd: os.tmpdir()
    }).on('close', (code) => {
      if (code === 0) {
        // req.debug(`Done PDF optimization => ${filePath}`);
        done(null, toFile);
      } else {
        done(new Error('ERROR: Optimizing PDF'), null);
      }
    }).on('error', (err) => {
      // req.debug(`ERROR: Optimizing PDF: ${err.message || err.toString()}`);
      done(err, null);
    });
  } catch (err) {
    done(err, null);
    // req.debug(`ERROR: Optimizing PDF: ${err.message || err.toString()}`);
  }
};

module.exports = psToPdf;
