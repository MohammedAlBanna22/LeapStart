const { User,Post, Expert } = require('../../../model');
const mongoose = require('mongoose');

module.exports.createpost = async (data) => {
	try {
		//console.log(data);
		let {user} = data;
		let {title,content} = data.postInfo;
		//console.log(title);
		//console.log(content);
		console.log(user);
		const userId= user._id;
		const expertId=user.expert._id;
		console.log(expertId);
		if (!title||!content){
			return { code: 1, message: 'title||content not filled',data:null };
		}	
		const expert =await Expert.findOne({_id:expertId});
		if (!expert)
		{
			return { code: 1, message: 'expert.notFound',data:null };
		}
		const post = await  Post.create({expertId,title,content});
		return {
			code: 0,
			message: 'post added successfully ',
			data: { post },
		};
	} catch (error) {
		//console.log(error);
		throw new Error(error);
	}
};
module.exports.getAllposts = async (data) => {
	try {
		const { id } = data;
		const expert=await Expert.findOne({_id:id});
		if (!expert){
			return { code: 1, message: ' expert not found',data:null };
		}	
		const catagories=expert.catagories;
		const expertPost =await Post.find({expertId:id,isDeleted:false});
		if (!expertPost)
		{
			return { code: 1, message: 'expertpost.notFound',data:null };
		}
		const fulldata={
			catagories,
			expertPost,
			
		};
		return {
			code: 0,
			message: 'ExpertPosts is  ',
			data: { fulldata },
		};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports.getApost = async (data) => {
	try {
	const { id } = data;
	const post=await Post.findOne({_id:id,isDeleted:false});
	if (!post){
		return { code: 1, message: ' post not found',data:null };
	}
	//category  is important to appear  in single post? to reduce request
	const expertid=post.expertId;
	const expert=await Expert.findOne({_id:expertid});
	const catagories=expert.catagories;
	const fulldata={
		catagories,
		post,	
	};
	return {
		code: 0,
		message: 'ExpertPost is  ',
		data: { fulldata },
	};
} catch (error) {
	console.log(error);
	throw new Error(error);
}
};

module.exports.deletePost = async (data) => {
	try {
	//console.log(data);
	const { id,user } = data;
	const expertid =user.expert._id;
	console.log(expertid);
	//console.log(id);
	//console.log(user);
	const post=await Post.findOne({_id:id,isDeleted:false,expertId:expertid});//
	if (!post){
		return { code: 1, message: ' post not found',data:null };
	}
	
	
	post.isDeleted = true;
	await post.save();
	
	return {
		code: 0,
		message: 'ExpertPost delete successfully  ',
		data: post ,
	};
} catch (error) {
	console.log(error);
	throw new Error(error);
}
};