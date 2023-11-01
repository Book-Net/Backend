const multer = require("multer");
const path = require("path");
const Book = require("../models/Book");
// const protect = require("../helper/authmiddleware");

const add_book_sell = async (req, res) => {
    
    const user = req.user;
  const u_id = user._id.toString();
  console.log(user._id.toString());

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/booknet_v001/backend/Backend/server/src/img');
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
    let option = req.body.option;
    let bookData = {
      title: req.body.title,
      authors: req.body.author,
      description: req.body.description,
      isbn: req.body.isbn,
      condition: req.body.condition,
      price: req.body.price,
      img: req.file.filename,
      location: req.body.location,
      option: option,
      category: req.body.category,
      user_id: u_id,
    };

    console.log(option);
    switch (option) {
      case "Sell":
        bookData.price = req.body.price;
        break;
      case "Bid":
        bookData.minbid = req.body.minbid;
        bookData.starts = req.body.starts;
        bookData.ends = req.body.ends;
        break;
      case "Donate":
        break;
      case "Exchange":
        bookData.needs = req.body.needs;
        break;
      default:
        break;
    }

    //   res.send(bookData);
    // Create the Book document
    Book.create(bookData)
      .then(res.status(200).json({ message: "The Book Added Successfully " }))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error saving file to database", error: err })
      );
  });
};

module.exports = add_book_sell;