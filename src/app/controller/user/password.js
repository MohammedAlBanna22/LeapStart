const {
	forgotPassword,
	recoverPassword,
	verifyPasswordCode,
} = require('../../service/user/password');
const { Success } = require('../../../utils/response/success/successes');
const {
	InternalServerError,
	BadRequest,
} = require('../../../utils/response/error/errors');

module.exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;
	try {
		const { message, data, code } = await forgotPassword({
			email,
			req,
		});
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (err) {
		console.log(err);
		return next(new InternalServerError(req));
	}
};

module.exports.recoverPassword = async (req, res, next) => {
	const { password, recoverToken } = req.body;
	try {
		const { message, data, code } = await recoverPassword({
			password,
			recoverToken,
		});
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (err) {
		console.log(err);
		return next(new InternalServerError(req));
	}
};

module.exports.verifyPasswordCode = async (req, res, next) => {
	try {
		const { _id, code: verificationCode } = req.body;
		const { message, data, code } = await verifyPasswordCode({
			_id,
			verificationCode,
		});
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (err) {
		console.log(err);
		return next(new InternalServerError(req));
	}
};
