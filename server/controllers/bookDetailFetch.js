const path = require('path');

const bookDetailFetch = (req,res) => {
    const isbn = req.params.isbn;
    res.send("HI");
};

module.exports = bookDetailFetch;