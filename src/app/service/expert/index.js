const Experts = require('../../../model/expert');
const { Users,Expert } = require('../../../model');
const User = require('../../../model/user');



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
