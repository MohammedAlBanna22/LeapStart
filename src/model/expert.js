/**
 * expert :TODO:
 *  1. userID : ref to user
 *  2. hourRate : dollar per hour
 *  3. available hours 0 booked hours => [] time at least up for the next 7
 *      days or the time the user identified // update it some how
 *      ==> into a diff  module
 *  4. expert rate : ==> the level of the expert //forget for now
 *  5. expert docs ==> cv old work
 *  6. bio
 *  7. fields /tags ==> in user // as expertise
 *  8.
 */

const mongoose = require('mongoose');
const User = require('./user');
const expertSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		hourlyRate: {
			type: Number,
		},
		expertRate: {
			type: Number,
		},
		numberOfSessions: {
			type: Number,
		},
		status: {
			type: String,
			enum: ['pending', 'rejected', 'approved'],
			default: 'pending',
		},
		disapproveReason: {
			reason: { type: String },
			note: { type: String },
		},
		expertDocs: {
			type: [String],
		},
		expertBio: {
			type: String,
		},
		catagories: {
			type: [String],
		},
		// availableHours: {
		// 	type: [Date],
		// }, /// => need to be deleted since we have a dedicated working hours module
		// bookedHours: {
		// 	type: [
		// 		{
		// 			startTime: { type: Date, required: true },
		// 			endTime: { type: Date, required: true },
		// 		},
		// 	],
		// 	default: [],
		// }, // => need to be deleted since we have dedicated module for sessions
	},
	{ timestamps: true }
);

const Expert = mongoose.model('Expert', expertSchema);
module.exports = Expert;

//  ADD BOOKED HOURS BY THE FOLLOWING CODE
// const expert = await Expert.findById(expertId);
// expert.bookedHours.push({
//   startTime: new Date('2022-05-01T10:00:00Z'),
//   endTime: new Date('2022-05-01T11:00:00Z'),
// });
// await expert.save();
