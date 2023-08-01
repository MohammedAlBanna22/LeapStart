const { Session, User, Expert } = require('../../../model');
module.exports.getById = async (user, id) => {
	try {
		//  console.log(user._id);
		// return { code: 0, message: '11', data: { user: user.expert._id } };
		const session = await Session.findOne({
			_id: id,
			$or: [{ expertId: user.expert._id }, { userId: user._id }],
		});
		if (!session) {
			return { code: 1, message: 'session Not found' };
		}
		if (
			user.isExpert &
			(session.expertId.toString() === user.expert._id.toString())
		) {
			return {
				code: 0,
				message: 'success this is the expert session',
				data: { session },
			};
		}
		if (session.userId.toString() === user._id.toString()) {
			return {
				code: 0,
				message: 'success this is the user session',
				data: { session },
			};
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports.get = async (user, query) => {
	try {
		return { code: 0, message: 'getById', data: { query, user } };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
