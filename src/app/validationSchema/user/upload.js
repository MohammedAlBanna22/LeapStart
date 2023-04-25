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
