'use strict';

const config = require('./src/config');

const fs = require('fs');
const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('./docs/openapi/spec.yaml');
const app = express();

const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;

const pdfRouter = require('./src/routers/pdf-router');

app.use(cors());
app.get('/version', (req, res) => {
  res.send({version});
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/pdf', pdfRouter);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${config.port}`);
});
