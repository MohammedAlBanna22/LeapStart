/**
 * expert :
 *  1. userID : ref to user
 *  2. hourRate : dollar per hour
 *  3. avaliable hours 0 booked hours => [] time at least up for the next 7     days or the time the user identifed // update it some how
 *  4. expert rate : ==> the level of the expert
 *  5. expert docs ==> cv old work
 *  6. bio
 *  7. fileds /tags ==> in user // as experties
 *  8.
 */

const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({});

module.exports = mongoose.model('Expert', expertSchema);
