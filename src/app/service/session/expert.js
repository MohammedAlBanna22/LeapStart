const { Session } = require('../../../model');
const moment = require('moment');

module.exports.put = async (user, id, data) => {
	try {
		const expertId = user.expert._id;
		// return { code: 0, message: ' ', data: { user } };
		const { status, expertFeedBack, expertRate, reason } = data;

		const session = await Session.findOne({
			_id: id,
			expertId,
		});
		if (!session) {
			return { code: 1, message: 'Session not found' };
		}

		if (status === 'approved' || status === 'rejected') {
			session.status = status;
			if (status === 'rejected') {
				session.canceled.isCanceled = true;
				session.canceled.reason = reason;
				session.canceled.canceller = 'expert';
				session.canceled.cancellingTime = moment().format();
			}
			await session.save({ sessionResponse: true }); // TODO: write a hook to send client notification that expert responded for his session request
		}
		if (expertFeedBack) {
			session.expertFeedBack = expertFeedBack;
		}
		if (expertRate) {
			session.expertRate = expertRate;
		}
		await session.save(); // we can write a hook to send feedback and rate or something else
		return {
			code: 0,
			message: 'session updated successfully',
			data: { session },
		};
	} catch (error) {
		throw new Error(error);
	}
};
