const { User, Expert } = require('../../../model');
const { getUser } = require('../../../responseModel/user');
const mongoose = require('mongoose');
const fs = require('fs');

module.exports.getUserById = async (data) => {
	try {
		const _id = data;
		const user = await User.aggregate([
			{
				$lookup: {
					from: 'experts',
					localField: 'expertId',
					foreignField: '_id',
					as: 'expert',
				},
			},
			{
				$unwind: {
					path: '$expert',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$match: {
					_id: mongoose.Types.ObjectId(_id),
					isDeleted: false,
					isBlocked: false,
				},
			},
			{
				$addFields: {
					photo: { $concat: ['https://drive.google.com/uc?id=', '$photo'] },
					'verifiedId.idFile': {
						$concat: ['https://drive.google.com/uc?id=', '$verifiedId.idFile'],
					},
					'expert.expertDocs': {
						$concatArrays: [
							{
								$map: {
									input: '$expert.expertDocs',
									as: 'doc',
									in: { $concat: ['https://drive.google.com/uc?id=', '$$doc'] },
								},
							},
						],
					},
				},
			},
			{
				$project: {
					password: 0,
					expertId: 0,
					
				},
			},
		]);

		if (!user) {
			return { code: 2, message: 'userNotfound', data: null };
		}

		return {
			code: 0,
			message: 'user info',
			data: { user },
		};
	} catch (error) {
		throw new Error(error);
	}
};



module.exports.getAllUsers = async (data) => {
	try {
		// filter by categorize
		let { search, filter, sort, offset, limit } = data;
		limit = limit ? parseInt(limit) : 10;
		offset = offset ? parseInt(offset) : 0;
		/* to handle sort input */
		if (sort && sort[0] == '-') {
			sort = { [sort.slice(1)]: -1 };
		} else if (sort) {
			sort = { [sort]: 1 };
		} else sort = { createdAt: -1 };

		let query = {
            isDeleted:false,
            isBlocked:false,
		};

		if (filter) {
			query.status = { $in: Array.isArray(filter) ? filter : [filter] };
		}

		if (search) {
			const regex = new RegExp(search, 'i');
			query.$or = [
				{ name: regex },
				{ email: regex },
				{ phone: regex },
				
			];
		}
		let users = await User.aggregate([
			{
				$match: {
					...query,
				},
			},

			{
				$project: {
					
						password: 0,
						//who see data??.. admin?
				},
			},

			{
				$sort: sort,
			},
			{
				$skip: parseInt(offset),
			},
			{
				$limit: parseInt(limit),
			},
		]);
	
		if (!users) {
			return { code: 1, message: 'User not found ', data: null };
		}
		return {
			code: 0,
			message: 'Users info',
			data: {  users },
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
module.exports.editUserDetail = async (id,data) => {
	try {
		const { name, bio } = data;
		console.log(id);
		console.log(name, bio);
		  const user = await User.findOneAndUpdate(
			{ _id: id }, 
			{$set:{
				name:name,
				bio:bio,
			}},
			 { new: true }
			);
			if(!user){
				return { code: 2, message: 'nothing to found', data: null };
			}
		
			return {
				code: 0,
				message: 'User name & bio Update succsessfully ',
				data:  {  user },
			};
		
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.editUserFullDetail = async (id,data) => {
	try {
		const {fullname,phone,country,Dob,Specialty} = data;
		console.log(id);
		console.log(fullname,phone,country,Dob,Specialty);
		  const user = await User.findOneAndUpdate(
			{ _id: id }, 
			{$set:{
				fullname:fullname,
				phone:phone,
                country:country,
                Dob:Dob,
                Specialty:Specialty,

			}},
			 { new: true }
			);
			if(!user){
				return { code: 2, message: 'nothing to found', data: null };
			}
		
			return {
				code: 0,
				message: 'User Full Data Update succsessfully ',
				data:  {  user },
			};
		
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};



