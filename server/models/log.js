const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Log Schema
const LogSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['access', 'action', 'audit']
    },
    createdBy: {
        type : Schema.Types.ObjectId,
        ref: 'User'
    }
  },{
      timestamps: true
  });

module.exports = Mongoose.model('Log', LogSchema);
