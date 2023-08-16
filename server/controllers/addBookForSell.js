const multer = require("multer");
const path = require("path");
const Book = require("../models/Book");

const add_book_sell = async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "E:/BookNet/Backend/server/src/img");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
  }).single("file");

  console.log("Hi");
  // res.json({ message: 'Image uploaded successfully!' });
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading file", error: err });
    }

    Book.create({
      title: req.body.title,
      authors: req.body.author,
      description: req.body.description,
      isbn: req.body.isbn,
      condition: req.body.condition,
      price: req.body.price,
      img: req.file.filename,
    })
      .then((result) => res.redirect("https://example.com"))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error saving file to database", error: err })
      );
  });
};

module.exports = add_book_sell;
