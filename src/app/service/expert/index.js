require('dotenv').config();
const { User, Expert } = require('../../../model');
const { getUser } = require('../../../responseModel/user');
const { driveService } = require('../../../utils/googleDriveService');
const fs = require('fs');

module.exports.reqExpert = async (req) => {
	try {
		const {
			files: files,
			user: { _id },
			body: { bio, catagories, hourlyRate }, // should all initial values needed for expert to function as well like(hourRate & and initial working hours ) knowing that expert can update them after
		} = req;

		const user = await User.findOne({ _id, isDeleted: false, isExpert: false });

		if (!user) {
			return { code: 1, message: 'user.notFoundUser' };
		}

		if (!files) return { code: 1, message: 'user.notFoundFile' };

		const folderName = 'expertReq';
		let folder = await driveService.searchFolder(folderName);
		if (!folder) {
			folder = await driveService.createFolder(folderName);
		}

		const upFiles = await Promise.all(
			files.map(async (file) => {
				const { originalname, mimetype, path } = file;
				const upFile = await driveService.saveFile(
					originalname,
					path,
					mimetype,
					folder.id
				);
				return upFile;
			})
		);

		const expertDocs = upFiles.map((upFile) => upFile.data.id);
		let expert;
		if (user.expertId) {
			expert = await Expert.findOne({ _id: user.expertId });
			expert.bio = bio;
			expert.expertDocs = expertDocs;
			expert.status = 'pending';
			expert.catagories = catagories;
			expert.hourlyRate = hourlyRate;
			await expert.save();
			// await user.populate('expertId');
			// console.log(user);
		} else {
			expert = await Expert.create({
				user: _id,
				bio,
				expertDocs,
				status: 'pending',
				catagories,
				hourlyRate,
			});
			user.expertId = expert._id;
		}
		await user.save({ sendExpertRequest: true });

		//delete files after upload
		files.map((file) => fs.unlinkSync(file.path));

		return {
			code: 0,
			message: 'success',
			data: { expert, user: getUser(user) },
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};


module.exports.getAllExperts = async (data) => {
	try {
		// filter by categorize
		let { search, filter, sort, offset, limit } = data;

		limit = limit ? parseInt(limit) : 10;
		offset = offset ? parseInt(offset) : 0;

		/* to handle sort input */
		//
		if (sort && sort[0] == '-') {
			sort = { [sort.slice(1)]: -1 };
		} else if (sort) {
			sort = { [sort]: 1 };
		} else sort = { createdAt: -1 };

		let query = {
			'user.isDeleted': false,
			'user.isBlocked': false,
		};

		if (filter) {
			query.status = { $in: Array.isArray(filter) ? filter : [filter] };
		}

		if (search) {
			const regex = new RegExp(search, 'i');
			query.$or = [
				{ hourRate: regex },
				{ availableHours: regex },
				{ expertRate: regex },
				{ fields: regex },
				{ bio: regex },
				{ status: regex },
				{ 'user.name': regex },
				{ 'user.email': regex },
				{ 'user.phone': regex },
			];
		}
		// console.log(query);
		let experts = await Expert.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'user',
					foreignField: '_id',
					as: 'user',
				},
			},
			{
				$unwind: {
					path: '$user',
					preserveNullAndEmptyArrays: true,
				},
			},

			{
				$match: {
					...query,
				},
			},

			{
				$project: {
					user: {
						password: 0,
						expertId: 0,
					},
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

		const count = await Expert.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'user',
					foreignField: '_id',
					as: 'user',
				},
			},
			{
				$unwind: {
					path: '$user',
					preserveNullAndEmptyArrays: true,
				},
			},
			{ $match: { ...query } },
			{ $count: 'count' },
		]);

		// console.log(experts);
		if (!experts) {
			return { code: 1, message: 'Expert not found ', data: null };
		}
		return {
			code: 0,
			message: 'Experts info',
			data: { count, experts },
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports.getExpert = async (expertId) => {
	try {
		const expert = await Expert.findOne({
			_id: expertId,
			isDeleted: false,
		}).populate('user');
		if (!expert) {
			return { code: 1, message: 'Expert not found', data: null };
		}
		return { code: 0, message: `expert is ${expert.status}`, data: expert };
	} catch (error) {
		throw new Error(error);
	}
};


module.exports.editUserProfile = async (id,data) => {
	try {
		const { name, country, phone, email } = data;
		console.log(id);
		console.log(name, country, phone, email);
		  const user = await User.findOneAndUpdate(
			{ _id: id }, 
			{$set:{
				name:name,
				country:country,
				phone:phone,
				email:email
			}},
			 { new: true }
			);
			if(!user){
				return { code: 2, message: 'nothing to found', data: null };
			}
		
			return {
				code: 0,
				message: 'User Update succsessfully ',
				data:  {  user },
			};
		
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


module.exports.AvailabelHour = async (user,data) => {
	try {
		const  Avhour  = data;
		var expertid=user.expertId;
		const expert= await Expert.findOne({ expertid, isDeleted: false });
		if(!expert){
			return { code: 1, message: 'ExpertNotFound', data: null };
		}
		expert.availableHours=Avhour;
		await expert.save();
		return {
			code: 0,
			message: 'Avalible Hour added succsessfully ',
			data:  null,
		};
		
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
