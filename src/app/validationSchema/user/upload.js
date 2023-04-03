const { checkSchema } = require('express-validator');
const { isString, exists } = require('../errorMessages');

module.exports.uploadId = checkSchema({
	idNumber: {
		in: 'body',
		exists,
		isString,
		optional: false,
	},
	idDocumentType: {
		in: 'body',
		exists,
		isString,
		optional: false,
		custom: {
			options: (value) => {
				if (
					value !== 'passport' &&
					value !== 'national_id' &&
					value !== 'driving_license'
				) {
					throw new Error('user.invalidIdDocumentType');
				}
				return true;
			},
		},
	},
});

module.exports.uploadAddress = checkSchema({
	address1: {
		in: 'body',
		exists,
		isString,
		optional: false,
	},
	address2: {
		in: 'body',
		exists,
		isString,
		optional: false,
	},
	city: {
		in: 'body',
		exists,
		isString,
		optional: false,
	},
	country: {
		in: 'body',
		exists,
		isString,
		optional: false,
	},
	addressDocumentType: {
		in: 'body',
		exists,
		isString,
		optional: false,
		custom: {
			options: (value) => {
				if (
					value !== 'water_bill' &&
					value !== 'bank_statement' &&
					value !== 'phone_bill' &&
					value !== 'electricity_bill' &&
					value !== 'other'
				) {
					throw new Error('user.invalidAddressDocumentType');
				}
				return true;
			},
		},
	},
	otherDocumentType: {
		in: 'body',
		exists,
		isString,
		optional: true,
	},
});
