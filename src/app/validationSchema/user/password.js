const { checkSchema } = require('express-validator');
const { isString, exists } = require('../errorMessages');

module.exports.forgotPassword = checkSchema({
  email: {
    in: 'body',
    exists,
    isString,
    optional: false,
    custom: {
      options: (value) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(value);
      },
      errorMessage: () => 'user.WrongEmailFormat',
    },
  },
});

module.exports.recoverPassword = checkSchema({
  password: {
    in: 'body',
    exists,
    isString,
    optional: false,
    custom: {
      options: (value) => {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return regex.test(value);
      },
      errorMessage: () => 'user.passwordIsWeak',
    },
  },
  recoverToken: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
});
