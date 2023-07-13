const mongoose = require('mongoose');
const User = require('./user');

const workingHoursSchema = new mongoose.Schema({});

/**
 * now if working hours is needed which is most likely==>
 * ref to the expert
 * isBooked  ==> which a state not true or false since it can be pending
 * session id
 * start time
 * end time
 * isDeleted
 *
 */

const WorkingHours = mongoose.model('WorkingHours', workingHoursSchema);
module.exports = WorkingHours;
