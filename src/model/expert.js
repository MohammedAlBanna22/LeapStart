/**
 * expert :TODO:
 *  1. userID : ref to user
 *  2. hourRate : dollar per hour
 *  3. avaliable hours 0 booked hours => [] time at least up for the next 7
 *      days or the time the user identifed // update it some how
 *      ==> into a diff  module
 *  4. expert rate : ==> the level of the expert //forget for now
 *  5. expert docs ==> cv old work
 *  6. bio
 *  7. fileds /tags ==> in user // as experties
 *  8.
 */

const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		hourRate: {
			type: Number,
		},
		availableHours: {
			type: [Date],
		},
		expertRate: {
			type: Number,
		},
		expertDocs: {
			type: [String],
		},
		bio: {
			type: String,
		},
		fields: {
			type: [String],
		},
		bookedHours: {
			type: [
				{
					startTime: { type: Date, required: true },
					endTime: { type: Date, required: true },
				},
			],
			default: [],
		},
	},
	{ timestamps: true }
);

const Expert = mongoose.model('expert', expertSchema);
module.exports = Expert;

//  ADD BOOKED HOURS BY THE FOLLOWING CODE
// const expert = await Expert.findById(expertId);
// expert.bookedHours.push({
//   startTime: new Date('2022-05-01T10:00:00Z'),
//   endTime: new Date('2022-05-01T11:00:00Z'),
// });
// await expert.save();
