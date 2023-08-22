const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');


const add_book_author = async (req,res) => {
    const storage =multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, 'D:/booknet_v001/backend/Backend/server/src/img')
        },
        filename: (req, file, cb) =>{
            cb(null,file.fieldname + "_" + Date.now()+ path.extname(file.originalname))
        }
    })

    const upload=multer({
        storage:storage
    }).single('file');

    
    // res.json({ message: 'Image uploaded successfully!' });
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file', error: err });
        }

        // console.log("HI");
        Book.create({
            title: req.body.title,
            authors: req.body.author,
            quantity: req.body.quantity,
            description: req.body.description,
            isbn: req.body.isbn,
            price: req.body.price,
            img: req.file.filename })
        .then(result => res.redirect('http://localhost:3000/'))
        .catch(err => res.status(500).json({ message: 'Error saving file to database', error: err }));
    });
}

module.exports = add_book_author;