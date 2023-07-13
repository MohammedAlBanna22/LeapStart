/**
 * TODO: this is the model for session it should include :
 *  1. id
 *  2. expert mongo id ref from expert
 *  3. user mongo id ref from user
 *  4. time ==>
 *  5. status
 *  6.
 *
 */
const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
	expertId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Expert',
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const session = mongoose.model('Session', sessionSchema);
module.exports = session;

/**
 * ref to expert
 * ref user
 * start time
 * end time
 * status ==>
 * payment status ==>
 * amount ==>
 * currency ==> dollar by default
 * feedback {expert, user}
 * rate {expert, user}
 * timeStamp
 * isCancelled {boolean, who, why, when}
 */
