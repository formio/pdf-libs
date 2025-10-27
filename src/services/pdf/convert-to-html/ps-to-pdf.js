'use strict';

const os = require('os');
const {spawn} = require('child_process');

const {psToPdfPath} = require('../../../../config');

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
      cwd: os.tmpdir(),
      // for large pdfs, the stdout/stderr pipe buffers can fill up and this subprocess can block
      // we aren't listening to this output, so just ignore it
      // see https://nodejs.org/docs/latest-v20.x/api/child_process.html
      // TODO: should we be capturing stderr output and logging it if the subprocess exits with an error code?
      stdio: 'ignore',
    }).on('close', (code) => {
      if (code === 0) {
        // req.debug(`Done PDF optimization => ${filePath}`);
        done(null, toFile);
      }
      else {
        done(new Error('ERROR: Optimizing PDF'), null);
      }
    }).on('error', (err) => {
      // req.debug(`ERROR: Optimizing PDF: ${err.message || err.toString()}`);
      done(err, null);
    });
  }
  catch (err) {
    done(err, null);
    // req.debug(`ERROR: Optimizing PDF: ${err.message || err.toString()}`);
  }
};

module.exports = {psToPdf};
