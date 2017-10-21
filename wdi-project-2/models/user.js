//require mongoose - a way to talk to the database
const mongoose = require('mongoose');
//for encrypting the password
const bcrypt   = require('bcrypt');

//blueprint for the user
const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


//encrypts the password
userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

//use a virtual so that the second password is not stored in the database
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation!== this.password) this.invalidate('passwordConfirmation', 'Does not match');
  next();
});


//bcrypt will compare the provided password with the one in the database, and **will return a boolean**.
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};


//call userSchema User and export it
module.exports = mongoose.model('User', userSchema);
