const {
	verifyEmail,
	verifyRefreshToken,
} = require('../../service/user/verify');
const { Success } = require('../../../utils/response/success/successes');
const {
	InternalServerError,
	BadRequest,
	NotFound,
} = require('../../../utils/response/error/errors');

module.exports.verifyEmail = async (req, res, next) => {
	try {
		// const { verifyCode } = req.body;

		const { message, data, code } = await verifyEmail({
			...req.body,
			_id: req.user._id,
		});
		if (code === 0) {
			return next(new Success(message, data));
		}
		if (code === 1) {
			return next(new NotFound(message, data));
		}

		return next(new BadRequest(message));
	} catch (err) {
		console.log(err);
		return next(new InternalServerError(req));
	}
};

module.exports.verifyRefreshToken = async (req, res, next) => {
	const { refreshToken } = req.body;
	try {
		const { message, data, code } = await verifyRefreshToken({
			refreshToken,
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
