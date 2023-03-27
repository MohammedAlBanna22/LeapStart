const { checkSchema } = require('express-validator');
const { isString, exists, isInt } = require('../errorMessages');

module.exports.verify = checkSchema({
  code: {
    in: 'body',
    exists,
    isInt,
    optional: false,
  },
});

module.exports.verifyToken = checkSchema({
  refreshToken: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
});
