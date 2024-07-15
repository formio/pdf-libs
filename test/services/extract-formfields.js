/* eslint-env mocha */
'use strict';

const mock = require('mock-require');
const assert = require('assert');

process.env.PDF2HTMLEX_PATH = 'test';
process.env.PSTOPDF_PATH = 'test';
process.env.EXTRACT_FORMFIELDS = 'test';
let {extractFormfields} = require('../../src/services/pdf/formfields');

describe('Extract formfields tests', () => {
  before(() => {
    mock('child_process', {
      exec: (__cmd, options, cb) => {
          assert.equal(options.maxBuffer, 1024 * 1024 * 50, 'options.maxBuffer should be equal to 50mb');
          return cb(null, {stdout: '{"test":"test"}'});
      }
    });
    // rerequire all modules in the chain to child_process.exec
    // to mock exec consistenlty
    let __exec = mock.reRequire('../../src/utils');
    let __utils = mock.reRequire('../../src/utils');
    extractFormfields = mock.reRequire('../../src/services/pdf/formfields').extractFormfields;
  });

  after(() => {
    mock.stop('child_process');
  });

  it('should exec extract-formfields and return its stdout', async () => {
    const res = await extractFormfields('filepath');
    assert.deepEqual(res, {test: 'test'});
  });
});
