const {
  ACCESS_DENIED,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} = require('../../httpCodes');
const { GeneralError } = require('./generalError');

class AccessDenied extends GeneralError {
  constructor(message, statusCode, data = undefined) {
    super(message, ACCESS_DENIED, data);
  }
}

class BadRequest extends GeneralError {
  constructor(message, statusCode, data = undefined) {
    super(message, BAD_REQUEST, data);
  }
}

class InternalServerError extends GeneralError {
  constructor(message, statusCode, data = undefined) {
    super(message, INTERNAL_SERVER_ERROR, data);
  }
}

class NotFound extends GeneralError {
  constructor(message, statusCode, data = undefined) {
    super(message, NOT_FOUND, data);
  }
}

class Unauthorized extends GeneralError {
  constructor(message, statusCode, data = undefined) {
    super(message, UNAUTHORIZED, data);
  }
}

class UnprocessableEntity extends GeneralError {
  constructor(message, statusCode, data = undefined) {
    super(message, UNPROCESSABLE_ENTITY, data);
  }
}

/**
 * @type {{
 * BadRequest: BadRequest,
 * Unauthorized: Unauthorized,
 * AccessDenied: AccessDenied,
 * GeneralError: GeneralError,
 * InternalServerError: InternalServerError,
 * UnprocessableEntity: UnprocessableEntity,
 * NotFound:NotFound,}}
 */
module.exports = {
  Unauthorized,
  AccessDenied,
  InternalServerError,
  BadRequest,
  GeneralError,
  UnprocessableEntity,
  NotFound,
};
