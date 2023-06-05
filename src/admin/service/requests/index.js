const { Request } = require('../../../model');
module.exports.getRequestById = async () => {};

module.exports.getRequests = async (data) => {
	try {
		const requests = await Request.find({ isDeleted: false });
		return { code: 0, message: 'here is the request', data: requests };
	} catch (error) {
		throw new Error(error);
	}
};
