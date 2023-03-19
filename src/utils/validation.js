const { validationResult } = require('express-validator');

const {
  UnprocessableEntity,
  InternalServerError,
} = require('./response/error/errors');
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param next
 */
module.exports.validateRequest = async (req, res, next) => {
  try {
    const results = await validationResult(req);
    if (results.isEmpty()) {
      return next();
    }
    let errors = results.array().map((element) => {
      if (element.msg === 'Invalid value(s)') {
        return {
          key: element.param,
          message: element.nestedErrors,
          handler_type: 'message',
        };
      }
      return {
        key: element.param,
        message: element.msg,
        handler_type: 'message',
      };
    });
    if (errors.length === 1) {
      [errors] = errors;
    }
    return next(new UnprocessableEntity(errors));
  } catch (e) {
    console.log(e);
    return next(new InternalServerError(req));
  }
};
