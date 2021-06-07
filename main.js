'use strict';

const config = require('./src/config');

const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('./docs/openapi/spec.yaml');
const app = express();

const pdfRouter = require('./src/routers/pdf-router');

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/pdf', pdfRouter);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${config.port}`);
});
