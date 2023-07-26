/**  => id for the post
    ==> userId for the user ... ==> should the post owner an expert or any user ?
    ==> title 
    ==> body
    ==> created at 
    ==> comments 
    ==> likes 
    
*/
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
	{
        // should be expert or user  ?
		expertId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
		},
		content: {
				type: String,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
			
	},
	{ timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;


