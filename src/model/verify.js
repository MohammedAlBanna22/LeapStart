const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'users',
  },
  verificationCode: {
    type: String,
  },
  email: {
    trim: true,
    type: String,
  },
  mobile: {
    trim: true,
    type: String,
  },
  createdAt: { type: Date, expires: '2m', default: Date.now },
});
const Verification = mongoose.model('verification', verificationSchema);
module.exports = Verification;
