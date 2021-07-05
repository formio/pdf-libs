'use strict';

/**
 * Express middleware.
 * TODO: get file from base64 encoded string
 * @param req
 * @param res
 * @param next
 */
const getFileFromBase64 = (req, res, next) => {
  next();
};

module.exports = getFileFromBase64;
