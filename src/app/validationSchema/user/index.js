const { checkSchema } = require('express-validator');
const { isString, exists } = require('../errorMessages');

module.exports.signup = checkSchema({
 phone: {
    in: ['body'],
    exists,
    isString,
    optional: false,
    custom: {
      options: (value) => {
        const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        return regex.test(value);
      },
      errorMessage: () => 'user.WrongMobileFormat',
    },
  },
  name: {
    in: 'body',
    exists,
    isString,
    optional: false,
  },
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
  country: {
    in: 'body',
    isString,
    optional: false,
  },
  password: {
    in: 'body',
    exists,
    isString,
    optional: false,
    custom: {
      options: (value) => {
        const regex =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return regex.test(value);
      },
      errorMessage: () => 'user.passwordIsWeak',
    },
  },
});

module.exports.login = checkSchema({
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
  password: {
    in: 'body',
    exists,
    optional: false,
  },
});
