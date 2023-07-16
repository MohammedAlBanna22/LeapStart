module.exports.getById = async (user, id) => {
	try {
		return { code: 0, message: 'getById', data: { user, id } };
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
