const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Post Schema Formation
module.exports.PostSchemaFormation = {
  content: {
      type: String,
      required: true,
      trim: true
  },
  createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }  
};
