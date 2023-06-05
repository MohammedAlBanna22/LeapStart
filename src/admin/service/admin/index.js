const { User, Request, Expert } = require('../../../model');

const { getUser } = require('../../../responseModel/user');

module.exports.verifyId = async (data) => {
	try {
		const { requestId, response, reason, note } = data;
		const request = await Request.findOne({ _id: requestId, isDeleted: false });

		if (!request || request.status === 'canceled') {
			return { code: 1, message: 'this request is deleted or cancelled' };
		}

		const user = await User.findOne({
			_id: request.user,
			isDeleted: false,
			isBlocked: false,
		});

		if (!user) {
			request.isDeleted = true;
			request.save();
			return { code: 1, message: 'user not found' };
		}

		if (response === 'approve') {
			user.verifiedId.status = 'approved';
			user.save();
			request.isDeleted = true;
			request.save();
			return {
				code: 0,
				message: 'request approved and user ID verified',
				data: { user: getUser(user) },
			};
		} else if (response === 'reject') {
			user.verifiedId.status = 'rejected';
			user.verifiedId.disapproveReason.reason = reason;
			user.verifiedId.disapproveReason.note = note;
			user.save();
			request.isDeleted = true;
			request.save();
			return {
				code: 0,
				message: 'request rejected',
				data: { user: getUser(user) },
			};
		}
		return { code: 1, message: 'response not valid' };
	} catch (error) {
		throw new Error(error);
	}
};

module.exports.expertHandler = async (data) => {
	try {
		const { requestId, response, reason, note } = data;
		const request = await Request.findOne({ _id: requestId });

		if (!request || request.status === 'canceled') {
			return { code: 1, message: 'this request is deleted or cancelled' };
		}

		const user = await User.findOne({
			_id: request.user,
			isDeleted: false,
			isBlocked: false,
		});
		if (!user) {
			request.isDeleted = true;
			request.save();
			return { code: 1, message: 'user not found' };
		}
		const expert = await Expert.findOne({ _id: user.expertId });
		if (!expert) {
			request.isDeleted = true;
			request.save();
			return { code: 1, message: 'user not an expert' };
		}
		if (response === 'approve') {
			user.role = 'expert';
			user.isExpert = true;
			expert.status = 'approved';
			request.isDeleted = true;
			user.save();
			request.save();
			expert.save();
		}
		if (response === 'reject') {
			expert.status = 'rejected';
			expert.disapproveReason.reason = reason;
			expert.disapproveReason.note = note;
			request.isDeleted = true;
			request.save();
			expert.save();
		}

		return { code: 0, message: '', data: { request, user } };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
