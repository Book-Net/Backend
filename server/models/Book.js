const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  description: String,
  isbn: String,
  // Add other fields as needed
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
