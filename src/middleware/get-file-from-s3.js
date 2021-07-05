'use strict';

/**
 * Express middleware.
 * TODO: get file from AWS S3
 * @param req
 * @param res
 * @param next
 */
const getFileFromS3 = (req, res, next) => {
  next();
};

module.exports = getFileFromS3;
