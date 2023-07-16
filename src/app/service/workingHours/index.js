const {
	Expert,
	User,
	WorkingHours: workingHours,
	WorkingHours,
} = require('../../../model');

module.exports.getAll = async (user, query) => {
	try {
		return { code: 0, message: 'getAll', data: { user, query } };
	} catch (error) {
		throw new Error(error);
	}
};
module.exports.get = async (user, id) => {
	try {
		return { code: 0, message: 'get', data: { id, user } };
	} catch (error) {
		throw new Error(error);
	}
};
module.exports.post = async (user, data) => {
	try {
		const { startTime, endTime } = data;
		const expertId = user.expert.id;

		// let workingHour = await WorkingHours.create({expert});

		return { code: 0, message: 'post', data: { expertId, user, data } };
	} catch (error) {
		throw new Error(error);
	}
};
module.exports.put = async (user, id, body) => {
	try {
		return { code: 0, message: 'put', data: { id, body, user } };
	} catch (error) {
		throw new Error(error);
	}
};
module.exports.deleteById = async (user, id) => {
	try {
		return { code: 0, message: 'delete', data: { id, user } };
	} catch (error) {
		throw new Error(error);
	}
};
