const {
	BadRequest,
	InternalServerError,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');
const { post, put, cancel } = require('../../service/session/user');
module.exports.post = async function (req, res, next) {
	try {
		const { code, message, data } = await post(req.user, req.body);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(message));
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
		console.log(error);
		return next(new InternalServerError(message));
	}
};

// module.exports.cancel = async function (req, res, next) {
// 	try {
// 		const { code, message, data } = await cancel(req.user, req.params.id);
// 		if (code === 0) {
// 			return next(new Success(message, data));
// 		}
// 		return next(new BadRequest(message));
// 	} catch (error) {
// 		console.log(error);
// 		return next(new InternalServerError(message));
// 	}
// };
