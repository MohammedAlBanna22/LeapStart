const { default: mongoose } = require('mongoose');
const { Request, User } = require('../../../model');
module.exports.getRequestById = async () => {};

module.exports.getRequests = async (data) => {
	try {
		const requests = await Request.find({ isDeleted: false });
		return { code: 0, message: 'here is the request', data: requests };
	} catch (error) {
		throw new Error(error);
	}
};

module.exports.getRequestById = async (reqId) => {
	try {
		const request = await Request.findOne({ _id: reqId });
		if (!request) {
			return { code: 1, message: 'Request not found' };
		}
		const user = await User.findOne({ _id: request.user }).populate('expertId');
		if (!user) {
			return { code: 1, message: 'User not found' };
		}
		return { code: 0, message: 'Request', data: { request, user } };
	} catch (error) {
		throw new Error(error);
	}
};
