const path = require('path');
const assert = require('assert');
const superagent = require('superagent');
const runServer = require('./runServer');

const PDF_FIXTURE = path.resolve(__dirname, './fixtures/fw4.pdf');

describe('Test convertToHtml', () => {
  let server;

  before(async () => {
    server = await runServer(3000);
  });

  it('should return html', async () => {
    const response = await superagent
      .post(`http://localhost:3000/pdf/convertToHtml`)
      .set('Content-Type', 'multipart/form-data')
      .attach('pdf', PDF_FIXTURE);

    const html = response.text;
    assert.ok(html.includes('<!DOCTYPE html>'));
    assert.ok(html.includes('Base CSS for pdf2htmlEX'));
  });

  after(() => {
    server.kill();
  });
});