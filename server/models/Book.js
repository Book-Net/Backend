const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  isbn: String,
  quantity: Number,
  price: Number,
  img: String
  // Add other fields as needed
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
