'use strict';

const {ValidationError} = require('../errors');

const errorHandler = (err, req, res, __next) => {
  req.debug?.(`Error: ${err.message || err}`);
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).send(err.message);
  }
  res.status(500).send(err.message ?? err);
};

module.exports = {errorHandler};
