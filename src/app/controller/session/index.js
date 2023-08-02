const { Success } = require('../../../utils/response/success/successes');
const {
	BadRequest,
	InternalServerError,
} = require('../../../utils/response/error/errors');
const { getById, get } = require('../../service/session/');
module.exports.getById = async function (req, res, next) {
	try {
		const { code, message, data } = await getById(req.user, req.params.id);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};

module.exports.get = async function (req, res, next) {
	try {
		const { code, message, data } = await get(req.user, req.query);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
