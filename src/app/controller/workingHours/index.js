const {
	InternalServerError,
	AccessDenied,
	BadRequest,
} = require('../../../utils/response/error/errors');
const {
	Success,
	Created,
} = require('../../../utils/response/success/successes');
const {
	getAll,
	get,
	post,
	put,
	deleteById,
} = require('../../service/workingHours/');

module.exports.getAll = async function (req, res, next) {
	try {
		const { code, message, data } = await getAll(req.user, req.query);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};

module.exports.getById = async function (req, res, next) {
	try {
		const { code, message, data } = await get(req.user, req.params.id);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};
module.exports.post = async function (req, res, next) {
	try {
		const { code, message, data } = await post(req.user, req.body);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};
module.exports.put = async function (req, res, next) {
	try {
		const { code, message, data } = await put(
			req.user,
			req.params.id,
			req.body
		);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};
module.exports.delete = async function (req, res, next) {
	try {
		const { code, message, data } = await deleteById(req.user, req.params.id);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};
