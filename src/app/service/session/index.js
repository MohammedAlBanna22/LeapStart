const { Session, User, Expert } = require('../../../model');
const moment = require('moment');
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
		const output = {};

		let { skip } = query;
		skip = skip ? skip * 7 : 0;

		let start = moment().startOf('isoWeek').add(-1, 'day');
		start = moment(start).add(skip, 'day').toDate();
		const end = moment(start).add(6, 'day').toDate();
		// console.log({ start, end });
		if (user.isExpert == true) {
			output.workingHours = user.expert.availableHours;
		}
		const sessions = await Session.find({
			$or: [{ expertId: user.expert._id }, { userId: user._id }],
			startTime: { $gte: start, $lte: end },
		});

		output.sessions = sessions;	

		return { code: 0, message: 'success , user calender', data: { ...output } };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
