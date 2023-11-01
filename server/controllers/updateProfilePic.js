const multer = require("multer");
const path = require("path");
const User = require("../models/user");

// const protect = require("../helper/authmiddleware");

const update_pro_img = async (req, res) => {
  const user = req.user;
  const u_id = user._id.toString();
  console.log(user._id.toString());

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

  // res.json({ message: 'Image uploaded successfully!' });
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading file", error: err });
    }

    //   res.send(bookData);
    // Create the Book document
    console.log("HI mn id " + u_id);
    User.findByIdAndUpdate(u_id, { img: req.file.filename }, { new: true })
      .then(res.status(200).json({ message: "The Book Added Successfully " }))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error saving file to database", error: err })
      );
  });
};

module.exports = update_pro_img;
