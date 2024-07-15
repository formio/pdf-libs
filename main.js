'use strict';
const express = require('express');
const cors = require('cors');

const app = express();

const config = require('./config');

const {version} = require('./package.json');
const {debug} = require('./src/handlers');
const {errorHandler} = require('./src/handlers/errors');

const pdfRouter = require('./src/router');
const debugScopes = require('./src/debug-scopes');

app.use(cors());

app.use(debug(debugScopes.DEFAULT));

app.get('/version', async (__req, res) => {
  res.send({version});
});

app.use('/pdf', pdfRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`PDF Libs listening on port: ${config.port}`);
});
