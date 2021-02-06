const Mongoose = require('mongoose');
const { PostSchemaFormation } = require('./formation/post');
const { Schema } = Mongoose;

// Post Schema
const PostSchema = new Schema(
    PostSchemaFormation,{
      timestamps: true
  });

module.exports = Mongoose.model('Post', PostSchema);
