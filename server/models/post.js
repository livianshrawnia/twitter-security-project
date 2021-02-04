const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Post Schema
const PostSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createRequest: {
        type: Boolean,
        default: false
    },
    createRequestBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    updateRequest: {
        type: Boolean,
        default: false
    },
    updateRequestBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deleteRequest: {
        type: Boolean,
        default: false
    },
    deleteRequestBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  },{
      timestamps: true
  });

module.exports = Mongoose.model('Post', PostSchema);
