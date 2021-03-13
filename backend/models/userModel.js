const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const cryptoRandomString = require('crypto-random-string');

// creating the user schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, 'First name required.'],
  },
  lastName: {
    type: String,
    // required: [true, 'Last name required.'],
  },
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email required.'],
    unique: true,
    lowercase: true,
    validate: { validator: validator.isEmail, message: 'Invalid email' },
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function (password) {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
        return re.test(password);
      },
      message:
        'Password must contains at least one uppercase letter, one lowecase letter and a number',
    },
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm the password'],
    validate: {
      validator: function (passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: 'Password not confirmed',
    },
    select: false,
  },
  role: {
    type: String,
    enum: ['standard', 'admin'],
    default: 'standard',
  },
  active: {
    type: Boolean,
    default: false,
  },
});

// before creating a new user
userSchema.pre('save', async function (next) {
  // checking if the password was modified
  if (!this.isModified('password')) return next();

  // hashing the password
  this.password = await bcryptjs.hash(this.password, 12);

  // deleting the passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

// checking if the password is correct during the login and during a password update
userSchema.methods.checkPassword = async function (reqPassword, userPassword) {
  return await bcryptjs.compare(reqPassword, userPassword);
};

// exporting the user model
module.exports = mongoose.model('User', userSchema);
