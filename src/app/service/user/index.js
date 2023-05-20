const { User, Verification, Expert } = require('../../../model');
const {
	sendVerificationCodeEmail,
} = require('../../../utils/notifications/email');
const jwt = require('../../../utils/jwt');
const bcrypt = require('bcrypt');
const { getUser } = require('../../../responseModel/user');
const mongoose = require('mongoose');
module.exports.signup = async (data) => {
	try {
		const { name, email, password, country, phone } = data;

		const { SALT } = process.env;
		const isUsedEmail = await User.findOne({ email, isDeleted: false });
		if (isUsedEmail) {
			return { code: 2, message: 'user.usedEmail', data: null };
		}
		const isUsedPhone = await User.findOne({ phone, isDeleted: false });
		if (isUsedPhone) {
			return { code: 2, message: 'user.usedMobile' };
		}

		const salt = await bcrypt.genSalt(Number(SALT));
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			phone,
			password: hashedPassword,
			country,
		});

		const accessToken = jwt.createAccessToken({
			id: user._id,
			role: user.role,
		});
		const refreshToken = jwt.createRefreshToken({
			id: user._id,
			role: user.role,
		});
		return {
			code: 0,
			message: 'commonSuccess.message',
			data: { accessToken, refreshToken, user: getUser(user) },
		};
	} catch (error) {
		throw new Error(error);
	}
};

module.exports.login = async (data) => {
	try {
		const { email, password } = data;

		const user = await User.findOne({ email, isDeleted: false });

		if (!user) {
			return { code: 2, message: 'user.incorrectIdORPassword', data: null };
		}

		const isCorrectPassword = await bcrypt.compare(password, user.password);
		if (!isCorrectPassword) {
			return { code: 2, message: 'user.incorrectIdORPassword', data: null };
		}

		const accessToken = jwt.createAccessToken({
			id: user._id,
			role: user.role,
		});
		const refreshToken = jwt.createRefreshToken({
			id: user._id,
			role: user.role,
		});

		await user.save();

		return {
			code: 0,
			message: 'commonSuccess.message',
			data: { accessToken, refreshToken, user: getUser(user) },
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports.sendCodeToEmail = async (data) => {
	const { _id } = data;
	try {
		const user = await User.findOne({ _id, isDeleted: false });
		if (!user) {
			return { code: 1, message: 'user.notFoundUser', data: null };
		}
		// if (user.verifiedEmail) {
		// 	return {
		// 		code: 2,
		// 		message: 'user email already verified',
		// 		data: { _id, email: user.email },
		// 	};
		// }
		const code = 123456; //TODO: MAKE IT RANDOM

		let verification = await Verification.findOne({
			userId: _id,
			email: user.email,
		});

		if (!verification) {
			verification = new Verification({ userId: _id, email: user.email });
			verification = await verification.save();
		}
		verification.code = code;
		console.log(verification);
		await verification.save();

		await sendVerificationCodeEmail(user.email, code);

		return {
			code: 0,
			message: 'commonSuccess.message',
			data: { _id, email: user.email },
		};
	} catch (error) {
		throw new Error(error);
	}
};

///**Search by id**/
//dublicate in profile
module.exports.getUserById = async (data) => {
	try {
		const _id = data;
		// const user = await User.findOne({ _id, isDeleted: false }).populate(
		// 	'expertId'
		// );
		const user = await User.aggregate([
			{
				$lookup: {
					from: 'experts',
					localField: 'expertId',
					foreignField: '_id',
					as: 'expert',
				},
			},
			{
				$unwind: {
					path: '$expert',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$match: {
					_id: mongoose.Types.ObjectId(_id),
					isDeleted: false,
					isBlocked: false,
				},
			},
			{
				$addFields: {
					photo: { $concat: ['https://drive.google.com/uc?id=', '$photo'] },
					'verifiedId.idFile': {
						$concat: ['https://drive.google.com/uc?id=', '$verifiedId.idFile'],
					},
					'expert.expertDocs': {
						$concatArrays: [
							{
								$map: {
									input: '$expert.expertDocs',
									as: 'doc',
									in: { $concat: ['https://drive.google.com/uc?id=', '$$doc'] },
								},
							},
						],
					},
				},
			},
			{
				$project: {
					password: 0,
					expertId: 0,
					// __v: 0,
				},
			},
		]);

		if (!user) {
			return { code: 2, message: 'userNotfound', data: null };
		}

		return {
			code: 0,
			message: 'user info',
			data: { user },
			// data: { user: getUser(user) },
		};
	} catch (error) {
		throw new Error(error);
	}
};

module.exports.deleteUserInfo = async (data) => {
	try {
		const { _id } = data;
		const user = await User.findOne({
			_id: _id,
			isDeleted: false,
		});

		if (!user) {
			return { code: 2, message: 'userNotfound', data: null };
		}
		user.isDeleted = true;
		await user.save();

		return {
			code: 0,
			message: 'user deleted successfully',
			data: null, //{  user },
		};
	} catch (error) {
		throw new Error(error);
	}
};
