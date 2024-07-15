'use strict';

class ValidationError extends Error {
  constructor (message, errors) {
    super(message);
    this.errors = errors;
    this.statusCode = 400;
  }

  withStatus (statusCode) {
    this.statusCode = statusCode;
    return this;
  }
}

module.exports = {ValidationError};
