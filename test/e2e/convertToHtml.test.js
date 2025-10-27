const path = require('path');
const fs = require('fs');
const os = require('os');
const assert = require('assert');
const superagent = require('superagent');
const runServer = require('./runServer');

const PDF_FIXTURE = path.resolve(__dirname, './fixtures/fw4.pdf');

describe('Test convertToHtml', () => {
  let server;

  before(async () => {
    server = await runServer(3000);
  });

  const convertPdfToHtml = async () => {
    return await superagent
      .post(`http://localhost:3000/pdf/convertToHtml`)
      .set('Content-Type', 'multipart/form-data')
      .attach('pdf', PDF_FIXTURE);
  };

  it('should return html', async () => {
    const response = await convertPdfToHtml();

    const html = response.text;
    assert.ok(html.includes('<!DOCTYPE html>'));
    assert.ok(html.includes('Base CSS for pdf2htmlEX'));
  });

  it('should not leave temporary files after conversion', async () => {
    const tmpDir = os.tmpdir();
    const beforeFiles = fs.readdirSync(tmpDir);
    const response = await convertPdfToHtml();
    assert.ok(response.status === 200, 'Conversion should succeed');
    // Wait a bit for cleanup to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    const afterFiles = fs.readdirSync(tmpDir);
    const newFiles = afterFiles.filter(file => !beforeFiles.includes(file));
    assert.strictEqual(
      newFiles.length, 
      0, 
      `Expected no temporary files to remain, but found: ${newFiles.join(', ')}`
    );
  });

  after(() => {
    server.kill();
  });
});