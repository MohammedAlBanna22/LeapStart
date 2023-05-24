const {
	InternalServerError,
	BadRequest,
} = require('../../../utils/response/error/errors');
const {
	Success,
	Created,
	NoContent,
	Continue,
} = require('../../../utils/response/success/successes');
const {
	signup,
	login,
	sendCodeToEmail,
	getUserById,
	deleteUserInfo,
} = require('../../service/user/index');

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
		const { code, message, data } = await login(req.body);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};

module.exports.sendCodeEmail = async (req, res, next) => {
	try {
		const { code, message, data } = await sendCodeToEmail({
			_id: req.user._id,
		});
		if (code === 1) {
			return next(new NotFound(message, data));
		}
		if (code === 2) {
			return next(new Continue(message, data));
		}
		if (code === 0) {
			return next(new Success(message, data));
		}

		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};

module.exports.deleteUser = async (req, res, next) => {
	try {
		const id = req.user._id;
		const { code, message, data } = await deleteUserInfo(id);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};
