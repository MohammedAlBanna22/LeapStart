// const { Expert, User } = require('../model/');

const link = 'https://drive.google.com/uc?id=';
module.exports.getUser = async (user) => {
	let expert;
	if (user.expertId) {
		await user.populate('expertId');
		expert = user.expertId;
		if (expert.expertDocs) {
			expert.expertDocs = expert.expertDocs.map((id) => `${link}${id}`);
		}
	}
	return {
		_id: user._id,
		name: user.name,
		email: user.email,
		country: user.country,
		phone: user.phone,
		photo: user.photo ? `${link}${user.photo}` : null,
		verifiedId: {
			...user.verifiedId,
			idFile: `${link}${user.photo}`,
		},
		verifiedEmail: user.verifiedEmail,
		role: user.role,
		isClientVerified: user.isClientVerified,
		isExpert: user.isExpert,
		expert: expert,
		lastLogin: user.lastLogin,
		lastLoginIP: user.lastLoginIP,
		isBlocked: user.isBlocked,
		isDeleted: user.isDeleted,
	};
};
