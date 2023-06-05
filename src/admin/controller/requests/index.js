const {
	InternalServerError,
	BadRequest,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');
const { getRequests } = require('../../service/requests');
module.exports.getRequestById = async (req, res, next) => {};

module.exports.getRequests = async (req, res, next) => {
	try {
		const { code, message, data } = await getRequests(req.params);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message, data));
	} catch (error) {
		console.error(error);
		return next(new InternalServerError(error));
	}
};
