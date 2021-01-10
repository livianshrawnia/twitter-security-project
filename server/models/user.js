const Mongoose = require('mongoose');
const { BookSchemaFormation } = require('./formation/book');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true
  },
  books : [BookSchemaFormation],
});

module.exports = Mongoose.model('User', UserSchema);
