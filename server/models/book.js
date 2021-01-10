const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const { BookSchemaFormation } = require('./formation/book');

// Book Schema
const BookSchema = new Schema(BookSchemaFormation);

module.exports = Mongoose.model('Book', BookSchema);
