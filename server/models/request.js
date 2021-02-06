const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const { UserSchemaFormation } = require('./formation/user');
const { PostSchemaFormation } = require('./formation/post');

// Request Schema
const RequestSchema = new Schema({
  user : {
    id : {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    email: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
    }
  },
  isUser: {
    type : Boolean,
    default : false
  },
  post : {
    id : {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    content: {
      type: String,
      trim: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }  
  },
  type: {
    type: String,
    required : true,
    enum: ['create', 'read', 'update', 'delete']
  },
  requestedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  isApproved: {
    type : Boolean,
    default : false
  }
},{
  timestamps: true
});

module.exports = Mongoose.model('Request', RequestSchema);
