const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/book/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const bookData = response.data.items[0].volumeInfo;
    res.json(bookData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching book data.' });
  }
});

module.exports = router;
