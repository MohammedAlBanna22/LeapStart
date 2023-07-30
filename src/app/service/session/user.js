const { Expert, Session, User } = require('../../../model');
const moment = require('moment');
const { isSessionValid } = require('./helper');

module.exports.post = async (user, body) => {
	try {
		const { expertId, sessionStart } = body;
		const userId = user._id;

		let start = moment(sessionStart);
		let end = moment(sessionStart).add(1, 'hours');

		let expert = await Expert.findOne({ _id: expertId, isDeleted: false });

		let availableHours = expert.availableHours;
		let daysIndex = {
			Sunday: 0,
			Monday: 1,
			Tuesday: 2,
			Wednesday: 3,
			Thursday: 4,
			Friday: 5,
			Saturday: 6,
		};
		availableHours.daysOfWork = availableHours.daysOfWork.map(
			(day) => daysIndex[day]
		);

		// check available working hours of expert
		if (!isSessionValid(start, end, availableHours)) {
			return {
				code: '1',
				message: `expert doesn't work at this time`,
			};
		}

		const existingSession = await Session.findOne({
			$or: [{ expertId: expertId }, { userId: userId }],
			status: { $nin: ['cancelled', 'rejected'] }, // Exclude sessions with 'cancelled' or 'rejected' status
			startTime: { $lte: start }, // Check if the given time is after or equal to the startTime
			endTime: { $gte: start }, // Check if the given time is before or equal to the endTime
		});

		if (existingSession.expertId.toString() === expertId.toString()) {
			return {
				code: '1',
				message: 'expert have a session at this time',
			};
		}

		if (existingSession.userId.toString() === userId.toString()) {
			return {
				code: '1',
				message: 'User have a session at this time',
			};
		}

		const session = await Session.create({
			expertId,
			userId,
			startTime: start,
			endTime: end,
			status: 'pending',
			payment: {
				amount: expert.hourlyRate,
			},
		});
		return {
			code: 0,
			message: 'hi this session got inserted',
			data: { session },
		};

		// return { code: 0, message: 'valid date', data: '' };

		// check if there is a session in this time in expert calendar

		// check if there is a session in this time in user calendar
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
module.exports.put = async (user, id, body) => {
	try {
		return { code: 0, message: 'put', data: { id, body, user } };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports.cancel = async (user, id) => {
	try {
		return { code: 0, message: 'cancel', data: { id, user } };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
