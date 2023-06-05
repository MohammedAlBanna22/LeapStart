const {
	InternalServerError,
	BadRequest,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');
const { verifyId, expertHandler } = require('../../service/admin');
module.exports.verifyId = async (req, res, next) => {
	try {
		const { code, message, data } = await verifyId(req.body);
		if (code == 0) {
			return next(new Success(message, data));
		}

		return next(new BadRequest(message, data));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
module.exports.expertHandler = async (req, res, next) => {
	try {
		const { code, message, data } = await expertHandler(req.body);
		if (code == 0) {
			return next(new Success(message, data));
		}

		return next(new BadRequest(message, data));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
