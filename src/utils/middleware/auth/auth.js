const { Unauthorized, AccessDenied } = require('../../response/error/errors');
const { verifyIdToken } = require('../../jwt');
const { User } = require('../../../model');

async function isAuthenticated(req, res, next) {
	const {
		headers: { authorization },
	} = req;

	if (!authorization) {
		return next(new Unauthorized('Unauthorized'));
	}

	if (!authorization.startsWith('Bearer')) {
		return next(new Unauthorized('Unauthorized'));
	}

	const split = authorization.split('Bearer ');
	if (split.length !== 2) {
		return next(new Unauthorized('Unauthorized'));
	}

	const token = split[1];

	try {
		const decodedToken = verifyIdToken(token);
		if (!decodedToken) {
			return next(new Unauthorized('Unauthorized'));
		}
		const user = await User.findOne({ _id: decodedToken.data.id });
		if (!user) {
			return next(new Unauthorized('Unauthorized'));
		}

		if (user.isDeleted) {
			return next(new AccessDenied('Deleted Account'));
		}

		if (user.isBlocked) {
			return next(new AccessDenied('Blocked Account'));
		}

		req.user = user;
		return next();
	} catch (err) {
		console.log(err);
		return next(new Unauthorized('Unauthorized'));
	}
}

module.exports = isAuthenticated;
