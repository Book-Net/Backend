const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  authors: String,
  description: String,
  isbn: String,
  condition: String,
  price: String,
  img: String,
  // Add other fields as needed
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
