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
		return { code: 0, message: 'post', data: { user, data } };
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
