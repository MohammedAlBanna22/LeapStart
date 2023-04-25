const {
	BadRequest,
	InternalServerError,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');
const { reqExpert } = require('../../service/expert');
const {
	getallexperts,
	
} = require('../../service/expert/index');


module.exports.reqExpert = async (req, res, next) => {
	try {
		const { code, message, data } = await reqExpert(req);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		console.log(error);
		return next(new InternalServerError(error));
	}
};

module.exports.getExperts = async (req, res, next) => {
	try {

        //const search=req.body.search;
		//const { code, message, data } = await getallexperts(search);



       // let userId = req.user._id;
        const { message, data, code } = await getallexperts({
          ...req.query,
         // userId
      });
       // console.log(...req.query);
		if (code === 0) {
			return next(new Success(message, data));
		}
		return next(new BadRequest(message));
	} catch (error) {
		return next(new InternalServerError(error));
	}
};