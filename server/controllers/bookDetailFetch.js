const path = require('path');
const fetch = require('node-fetch'); 

const bookDetailFetch = async (req,res) => {

    const isbn = req.params.isbn;
    // res.send(isbn);
        try {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
          const data = await response.json();
    
          if (data.items && data.items.length > 0) {
            const bookInfo = data.items[0].volumeInfo;
            const bookDetails = {
                title: bookInfo.title || 'NO INFO',
                author: bookInfo.authors ? bookInfo.authors.join(', ') : 'NO INFO',
                language: bookInfo.language || 'NO INFO',
                publisher: bookInfo.publisher || 'NO INFO',
                publishedDate: bookInfo.publishedDate || 'NO INFO',
                pageCount: bookInfo.pageCount || 'NO INFO',
                previewLink: bookInfo.previewLink || 'NO INFO',
                averageRating: bookInfo.averageRating || 'NO INFO',
              };
            res.status(200).json(bookDetails);
            // res.send(isbn);
          } else {
            res.status(404).json({ message: 'No book found for the given ISBN.'});
          }
        } catch (error) {
            console.error('Error fetching book details:', error);
            res.status(500).json({ message: 'An error occurred while fetching book details.' });
        }
      
};

module.exports = bookDetailFetch;