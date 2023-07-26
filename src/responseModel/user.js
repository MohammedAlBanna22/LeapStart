// const { Expert, User } = require('../model/');

const link = 'https://drive.google.com/uc?id=';
module.exports.getUser = async (user) => {
	// console.log(user);
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
		profileImage: user.profileImage ? `${link}${user.profileImage}` : null,
		profileBanner: user.profileBanner ? `${link}${user.profileBanner}` : null,
		bio: user.bio,
		dob: user.dob,
		verifiedId: {
			...user.verifiedId,
			idFile: idFile ? `${link}${user.idFile}` : null,
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
