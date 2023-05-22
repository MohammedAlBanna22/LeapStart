const {
	BadRequest,
	InternalServerError,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');

const {
	getUserById,
	getAllUsers,
	editUserDetail,

} = require('../../service/user/profile');

module.exports.getUser = async (req, res, next) => {
	try {
		const id = req.params._id;
		const { code, message, data } = await getUserById(id);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};

module.exports.getUsers = async (req, res, next) => {
	try {
		const { code, message, data } = await getAllUsers(req.query);
		if (code === 0) {
			return next(new Success(message, data));
		}

		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
module.exports.editDetails = async (req, res, next) => {
	try {
		const id = req.user._id;
		const updatedUserData = req.body;
		const { code, message, data } = await editUserDetail(id, updatedUserData);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
