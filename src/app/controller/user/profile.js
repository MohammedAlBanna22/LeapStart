const {
	BadRequest,
	InternalServerError,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');

const {
	getUserById,
	getAllUsers,
	editUserProfile,
	uploadId,
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
module.exports.editProfile = async (req, res, next) => {
	try {
		const { user, body, files } = req;
		const { code, message, data } = await editUserProfile(
			user._id,
			body,
			files
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

// module.exports.profileImage = async (req, res, next) => {
// 	const { id } = req.user;
// 	try {
// 		const { message, data, code } = await uploadImage({
// 			_id: id,
// 			file: req.file,
// 		});
// 		if (code === 0) {
// 			return next(new Success(message, data));
// 		}

// 		if (code === 1) {
// 			return next(new NotFound(message, data));
// 		}
// 		return next(new BadRequest(message));
// 	} catch (err) {
// 		console.log(err);
// 		return next(new InternalServerError(req));
// 	}
// };
