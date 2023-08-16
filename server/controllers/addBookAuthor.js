const multer = require("multer");
const path = require("path");
const Book = require("../models/Book");

const addBookAuthor = async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "E:/BookNet/Backend/server/src");
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
      .then((result) => res.json(result))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error saving file to database", error: err })
      );
  });
};

module.exports = addBookAuthor;
