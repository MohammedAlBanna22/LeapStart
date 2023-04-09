/*TODO:
 request that get send for admin to approve some docs 
  such as approving the id doc and expert docs so it need to save 
  1. userId the id of the user that sended the req 
  2. the type of req (enum [approve Id , approve expert ])
  3. we could add status and doc but i personally prefer getting them from the user ,to not duplicate data so populate
  4. time stamps
**/
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
		},
		type: {
			type: String,
			enum: ['user_id', 'expert_verify'],
		},
		status: {
			type: String,
			enum: ['created', 'updated', 'cancelled'],
			default: 'created',
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);
const Request = mongoose.model('request', requestSchema);
module.exports = Request;
