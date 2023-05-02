require('dotenv').config();
const { Users, Expert } = require('../../../model');//Users not work 
const { GoogleDriveService } = require('../../../utils/googleDriveService');
const fs = require('fs');
const { User } = require('../../../model');
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
			body: { bio, catagories, hourlyRate }, // should all initial values needed for expert to function as well like(hourRate & and initial working hours ) knowing that expert can update them after
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

		return { code: 0, message: 'success', data: { expert, user } };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};


module.exports.getallexperts = async (data) => {
	try {
		const {userId,offset, search, filter, sort, limit } = data; 

    //console.log(userId,offset, search, filter, sort, limit );

  // var test= await Expert.find();
  // console.log(test);
	
	//filter check it
	let query = {};
   if (filter) {
      query.status = { $in: Array.isArray(filter) ? filter : [filter] };
    }


    const regex = new RegExp(search, "i");
    //console.log(regex);
    
//await
   let expertsData = await Expert.aggregate([

   
   

      {
        
        $lookup: {

		  	from:"users",
				localField:"user",
				foreignField:"_id",
				as:"expert",

        },
      },
      
        {
        $unwind: {
         path: "$expert",
           preserveNullAndEmptyArrays: true,
        },
         },


    
      {

       




        
        $match: {
       //  bio: "this that blue black" , 
        //  status: 'pending',
       // name:"m",
          $or: [
       
		  { hourRate: regex },
		  { availableHours: regex },
		  { expertRate: regex },
		  { fields: regex },
      { bio: regex },
      { status: regex },
      
    
		//  {"user.name": regex },
		 // {"user.email":regex},
		 // {"user.phone":regex},
       
          ],
        },
      },

/*
      {
        $project:{
          createdAt:1,
        //  bio:1,
         // fields:1,
        // status:1,
        
          user: {
            _id:1,
            name:1,
           
          },

        }
      },
      */
     

   //how to call it (data)  
   //    {
     //    $sort: {sort},
     //  },
       {
        $skip: parseInt (offset),
       },
       {
         $limit: parseInt(limit),
       },
      
    ]);//.exec()


    
			

    //$project to make custom filed apper 1  disaper 0
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






