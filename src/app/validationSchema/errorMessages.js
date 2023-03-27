module.exports.isString = {
  errorMessage: () => 'Express.Validator.must_be_string',
};

module.exports.exists = {
  options: {
    checkFalsy: true,
  },
  errorMessage: () => 'CommonError.required',
};
module.exports.notEmpty = {
  errorMessage: () => 'CommonError.required',
};
module.exports.isInt = {
  errorMessage: () => 'Express.Validator.must_be_integer',
};
module.exports.isObject = {
  errorMessage: () => 'Express.Validator.must_be_object',
};

module.exports.isBoolean = {
  errorMessage: () => 'Express.Validator.must_be_boolean',
};

module.exports.isNumeric = {
  errorMessage: () => 'Express.Validator.must_be_number',
};

module.exports.isMongoId = {
  errorMessage: () => 'Express.Validator.must_be_valid_object_id',
};

module.exports.isISO8601 = {
  errorMessage: () => 'Express.Validator.must_be_valid_date',
};
