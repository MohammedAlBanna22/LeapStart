const express = require('express');
const {
	forgotPassword,
	recoverPassword,
} = require('../../../validationSchema/user/password');
const { verify } = require('../../../validationSchema/user/verify');
const controller = require('../../../controller/user/password');
const { validateRequest } = require('../../../../utils/validation');

const router = express.Router();

router.post(
	'/forgot',
	[forgotPassword, validateRequest],
	controller.forgotPassword
);
router.post(
	'/reset',
	[recoverPassword, validateRequest],
	controller.recoverPassword
);
router.post(
	'/verify-code',
	[verify, validateRequest],
	controller.verifyPasswordCode
);

module.exports = router;
