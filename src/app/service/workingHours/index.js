module.exports.getAll = async (user, query) => {
	try {
		return { code: 0, message: 'getAll', data: { user, query } };
	} catch (error) {
		throw new Error(error);
	}
};
module.exports.get = async () => {
	try {
		return { code: 0, message: 'get', data: null };
	} catch (error) {
		throw new Error(error);
	}
};
module.exports.post = async () => {
	try {
		return { code: 0, message: 'post', data: null };
	} catch (error) {
		throw new Error(error);
	}
};
module.exports.put = async () => {
	try {
		return { code: 0, message: 'put', data: null };
	} catch (error) {
		throw new Error(error);
	}
};
module.exports.deleteById = async () => {
	try {
		return { code: 0, message: 'delete', data: null };
	} catch (error) {
		throw new Error(error);
	}
};
