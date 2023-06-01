const {
	InternalServerError,
	BadRequest,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');
const { verifyId } = require('../../service/admin');
module.exports.verifyId = async (req, res, next) => {
	try {
		const { code, message, data } = await verifyId(userId);
		if (code == 0) {
			return next(new Success(message, data));
		}

		return next(new BadRequest(message, data));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
