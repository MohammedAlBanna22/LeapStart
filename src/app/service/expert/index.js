require('dotenv').config();
const { Users, Expert } = require('../../../model');
const { GoogleDriveService } = require('../../../utils/googleDriveService');
const fs = require('fs');

const driveService = new GoogleDriveService(
	process.env.GOOGLE_DRIVE_CLIENT_ID,
	process.env.GOOGLE_DRIVE_CLIENT_SECRET,
	process.env.GOOGLE_DRIVE_REDIRECT_URI,
	process.env.GOOGLE_DRIVE_REFRESH_TOKEN
);
module.exports.reqExpert = async (req) => {
	try {
		const {
			files: files,
			user: { _id },
			body: { bio, catagories },
		} = req;

		// console.log(fields);

		const user = await Users.findOne({ _id, isDeleted: false });
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

		const expert = await Expert.create({
			user: _id,
			bio,
			expertDocs,
			status: 'pending',
			catagories,
		});

		user.expertId = expert._id;
		await user.save({ sendExpertRequest: true });

		//delete files after upload
		files.map((file) => fs.unlinkSync(file.path));

		return { code: 0, message: 'success', data: { expert, user } };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
module.exports.getallexperts = async (data) => {
	try {
		const {userId,offset, search, filter, sort, limit } = data; 

   // console.log(userId,offset, search, filter, sort, limit );
	
	//filter check it
	let query = {};
   if (filter) {
      query.status = { $in: Array.isArray(filter) ? filter : [filter] };
    }

    const regex = new RegExp(search, "i");
   // let expertsData = await Users.aggregate([
		
//make change of table
   let expertsData = await Expert.aggregate([

      {
        $lookup: {
			
          from: "experts",
          localField: "_id",
          foreignField: "user",
          as: "experts",
/*
		  		from: "users",
				localField: "user",
				foreignField: "_id",
				as: "user",

*/
        },
      },

      
      {
        $match: {
       
          $or: [
			
            { "experts.hourRate": regex },
			{ "experts.availableHours": regex },
			{ "experts.expertRate": regex },
			{ "experts.fields": regex },
           { name: regex },
		   {email:regex},
		   {phone:regex},
		   {isDeleted:regex},//NOT WORK
		  // {role:regex},//not need 

		  
		   

/*
		  { hourRate: regex },
		  { availableHours: regex },
		  { expertRate: regex },
		  { fields: regex },
		 {"user.name": regex },
		 {"user.email":regex},
		 {"user.phone":regex},
		 {"user.isDeleted":regex},//NOT WORK
		// {role:regex},//not need 
        

 */         
          ],
        },
      },
   //how to call it (data)  
   //    {
     //    $sort: {sort},
     //  },
       {
        $skip: parseInt (offset),
       },
       {
         $limit: parseInt(limit),
       }
    ]);
	console.log(expertsData);
    if (!expertsData) {
      return { code: 1, message: "Expert not found ", data: null };
    }
    return {
      code: 0,
      message: "Experts info",
      data: { expertsData },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
/*
let expertsData = await experts.aggregate([
	from: "user",
	localField: "user",
	foreignField: "_id",
	as: "user",



	{ hourRate: regex },
			{ availableHours: regex },
			{ expertRate: regex },
			{ fields: regex },
           { "user.name": regex },
		   {"user.email":regex},
		   {"user.phone":regex},
		   {"user.isDeleted":regex},//NOT WORK
		  // {role:regex},//not need 


*/
