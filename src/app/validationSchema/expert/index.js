const { checkSchema } = require('express-validator');
const { isString, exists } = require('../errorMessages');

module.exports.reqExpert = checkSchema({});
