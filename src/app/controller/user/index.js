const {
  InternalServerError,
  BadRequest,
} = require('../../../utils/response/error/errors');
const {
  Success,
  Created,
} = require('../../../utils/response/success/successes');
const { signup, login } = require('../../service/user/index');
module.exports.signup = async (req, res, next) => {
  try {
    const { code, message, data } = await signup(req.body);
    if (code === 0) {
      return next(new Created(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { code, message, data } = await login();
    if (code === 0) {
      return next(new Success(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
