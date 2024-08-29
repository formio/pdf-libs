const path = require('path');
const assert = require('assert');
const superagent = require('superagent');
const runServer = require('./runServer');

const PDF_FIXTURE = path.resolve(__dirname, './fixtures/fw4.pdf');

describe('Test getFormfields', () => {
  let server;

  before(async () => {
    server = await runServer(3000);
  })

  it('should return formfields', async () => {
    const response = await superagent
      .post(`http://localhost:3000/pdf/getFormfields`)
      .set('Content-Type', 'multipart/form-data')
      .attach('pdf', PDF_FIXTURE);
    const json = response.body;
    const formfields = require('./fixtures/fw4.json');
    assert.deepEqual(json, formfields);
  });

  after(() => {
    server.kill();
  })
})