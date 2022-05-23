'use strict';

const config = require('./config');

const path = require('path');
const cors = require('cors');
const express = require('express');

const app = express();

const {version} = require('./package.json');

const pdfRouter = require('./src/pdf/router');

app.use(cors());

app.get('/version', async (__req, res) => {
  res.send({version});
});

app.use('/pdf', pdfRouter);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`PDF Libs listening on port: ${config.port}`);
});
