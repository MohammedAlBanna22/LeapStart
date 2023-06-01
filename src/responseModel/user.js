/**TODO: make a function to unite the response of data like user where
 *       we hide data like password and alter data like links to be complete */
module.exports.getUser = (user) => {
	const expert = user.expertId;
	if (expert) {
		user.populate('expertId');
		if (expert.expertDocs) {
			expert.expertDocs = expert.expertDocs.map(
				(id) => `https://drive.google.com/uc?id=${id}`
			);
		}
	}

	// return user;
	return {
		_id: user._id,
		name: user.name,
		email: user.email,
		country: user.country,
		phone: user.phone,
		photo: user.photo ? `https://drive.google.com/uc?id=${user.photo}` : null,
		verifiedId: {
			...user.verifiedId,
			idFile: `https://drive.google.com/uc?id=${user.photo}`,
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
