const {
	BadRequest,
	InternalServerError,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');

const {
	reqExpert,
	getExpert,
	getAllExperts,
	editUserProfile,
} = require('../../service/expert');

module.exports.reqExpert = async (req, res, next) => {
	try {
		const { code, message, data } = await reqExpert(req);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};

module.exports.getExperts = async (req, res, next) => {
	try {
		const { code, message, data } = await getAllExperts(req.query);
		if (code === 0) {
			return next(new Success(message, data));
		}

		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};

module.exports.getExpert = async (req, res, next) => {
	try {
		const { code, message, data } = await getExpert(req.params.id);

		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
module.exports.editProfile = async (req, res, next) => {
	try {
		//id from req.user or parms  req.user._id ??
		const id = req.params._id;
		const updatedUserData = req.body;
		const { code, message, data } = await editUserProfile(id,updatedUserData);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};