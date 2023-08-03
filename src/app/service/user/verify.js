const { User, Verification } = require('../../../model');
const jwt = require('../../../utils/jwt');

module.exports.verifyEmail = async (data) => {
	try {
		const { code, _id } = data;
		const user = await User.findOne({ _id, isDeleted: false });
		if (!user) {
			return { code: 1, message: 'user.notFoundUser', data: null };
		}

		const verifyUser = await Verification.findOne({
			code,
			userId: _id,
			email: user.email,
		});
		console.log('verifyUser:', verifyUser);

		if (!user) {
			return { code: 1, message: 'user.notFoundUser' };
		}
		if (!verifyUser) {
			return { code: 2, message: 'user.InvalidCode' };
		}
		if (code !== verifyUser.code) {
			return { code: 2, message: 'user.InvalidCode' };
		}

		await verifyUser.remove();

		user.verifiedEmail = true;
		await user.save();

		return {
			code: 0,
			message: 'commonSuccess.message',
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports.verifyRefreshToken = async (data) => {
	const { refreshToken } = data;
	try {
		const token = jwt.verifyRefreshToken(refreshToken);
		console.log(token);
		if (!token) {
			return { code: 1, message: 'user.invalidToken' };
		}
		const accessToken = jwt.createAccessToken({
			id: token.data.id,
			role: token.data.role,
		});
		const newRefreshToken = jwt.createRefreshToken({
			id: token.data.id,
			role: token.data.role,
		});
		return {
			code: 0,
			message: 'commonSuccess.message',
			data: {
				accessToken,
				refreshToken: newRefreshToken,
			},
		};
	} catch (error) {
		console.log(error);
		return { code: 1, message: 'user.invalidToken' };
	}
};
