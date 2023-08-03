const { Success } = require('../../../utils/response/success/successes');
const {
	BadRequest,
	InternalServerError,
} = require('../../../utils/response/error/errors');
const { put } = require('../../service/session/expert');

module.exports.put = async (req, res, next) => {
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
		console.log(error);
		return next(new InternalServerError(error));
	}
};
