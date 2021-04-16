'use strict';

const config = require('./src/config');

const cors = require('cors');
const express = require('express');
const app = express();

const pdfRouter = require('./src/routers/pdf-router');

app.use(cors());

app.use('/pdf', pdfRouter);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${config.port}`);
});
