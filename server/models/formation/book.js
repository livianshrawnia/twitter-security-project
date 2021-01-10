const Mongoose = require('mongoose');

// Book Schema Formation
module.exports.BookSchemaFormation = {
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  }
};
