const { Session, User, Expert } = require('../../../model');
const moment = require('moment');
module.exports.getById = async (user, id) => {
	try {
		//  console.log(user._id);
		// return { code: 0, message: '11', data: { user: user.expert._id } };
		const session = await Session.findOne({
			_id: id,
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
		return { code: 1, message: "this session doesn't belong to the user" };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports.get = async (user, query) => {
	try {
		const output = {};
		const dbQuery = {};
		let { skip } = query;

		skip = skip ? skip * 7 : false;
		let start, end;
		if (skip !== false) {
			start = moment().startOf('isoWeek').add(-1, 'day');
			start = moment(start).add(skip, 'day').toDate();
			end = moment(start).add(6, 'day').toDate();
		} else {
			if (user.isExpert == true) {
				output.workingHours = user.expert.availableHours;
				output.sessions = await Session.find({
					$or: [{ expertId: user.expert._id }, { userId: user._id }],
				});
				return {
					code: 0,
					message: 'success , all expert sessions',
					data: { ...output },
				};
			} else {
				output.sessions = await Session.find({
					userId: user._id,
				});
				return {
					code: 0,
					message: 'success , all user sessions',
					data: { ...output },
				};
			}
		}

		// console.log({ start, end });
		if (user.isExpert == true) {
			output.workingHours = user.expert.availableHours;
			output.sessions = await Session.find({
				$or: [{ expertId: user.expert._id }, { userId: user._id }],
				startTime: { $gte: start, $lte: end },
			});
			return {
				code: 0,
				message: 'success , expert calender',
				data: { ...output },
			};
		} else {
			output.sessions = await Session.find({
				userId: user._id,
				startTime: { $gte: start, $lte: end },
			});

			return {
				code: 0,
				message: 'success , user calender',
				data: { ...output },
			};
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
