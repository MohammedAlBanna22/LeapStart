const {
	uploadId,
	getIdFile,
	uploadImage,
} = require('../../service/user/upload');
const { Success } = require('../../../utils/response/success/successes');
const {
	InternalServerError,
	BadRequest,
	NotFound,
} = require('../../../utils/response/error/errors');

module.exports.uploadId = async (req, res, next) => {
	const { id } = req.user;
	try {
		const { message, data, code } = await uploadId({
			_id: id,
			...req.body,
			file: req.file,
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

module.exports.getIDFile = async (req, res, next) => {
	try {
		const { code, message, data } = await getIdFile(req.user._id);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};

module.exports.profileImage = async (req, res, next) => {
	const { id } = req.user;
	try {
		const { message, data, code } = await uploadImage({
			_id: id,
			file: req.file,
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
