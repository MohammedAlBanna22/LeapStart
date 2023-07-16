module.exports.post = async (user, body) => {
	try {
		return { code: 0, message: 'post', data: { body, user } };
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
