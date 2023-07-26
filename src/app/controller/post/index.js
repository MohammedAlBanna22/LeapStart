const {
	BadRequest,
	InternalServerError,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');

const {
	createpost,
	getAllposts,
	getApost,
	deletePost,
	

} = require('../../service/post');

module.exports.Create = async (req, res, next) => {
	try {
		

		const { user, body } = req;
		//const { code, message, data } = await createpost(
			///req
			
		//);
		//console.log(user);
		//console.log(body);
		//console.log(data);

      //  const user = req.user;
		const postInfo = req.body;
		const fulldata={
			user,
			postInfo
		};
		// req .user not defined take value 
		//console.log(user);
		//console.log(postInfo);
		const { code, message, data } = await createpost(fulldata);//user
		
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
module.exports.getPosts = async (req, res, next) => {
	try {
		const id = req.params.id;
		const { code, message, data } = await getAllposts({
			id: id,
		});
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
module.exports.getPost = async (req, res, next) => {
	try {
		const id = req.params.id;
		const { code, message, data } = await getApost({
			id: id,
		});
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};
module.exports.delete = async (req, res, next) => {
	try {
		const user=req.user;
		const id = req.params.id;
		const { code, message, data } = await deletePost({
			id: id,
			user:user,
		});
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};

