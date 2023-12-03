const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [isEmail, 'invalid Email'],
    required: [true, 'Email required'],
  },
  token: {
    type: String,
    required: true,
  },
});

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

module.exports = PasswordReset;
