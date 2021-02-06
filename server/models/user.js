const Mongoose = require('mongoose');
const { UserSchemaFormation } = require('./formation/user');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema(
  UserSchemaFormation,
  {
  timestamps : true
});

module.exports = Mongoose.model('User', UserSchema);
