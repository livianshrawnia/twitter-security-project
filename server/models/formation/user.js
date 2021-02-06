const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// User Schema Formation
module.exports.UserSchemaFormation = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
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
  role: {
    type: String,
    default: 'ROLE_USER',
    enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
  },
  updatedBy : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
};
