const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const {
  signupUser,
  loginUser,
  test,
  tokenVerify,
  getMe,
  editDetails,
  myBooks,
} = require("../controllers/authController");
const update_pro_img = require("../controllers/updateProfilePic");
const addBookAuthor = require("../controllers/addBookAuthor");
const add_book_sell = require("../controllers/addBookForSell");
const add_book_author = require("../controllers/Book_add_author");
const displayBookAuthor = require("../controllers/displayAuthorBooks");
const file_u = require("../controllers/file");
const createPost = require("../controllers/createPost")
const viewPost = require("../controllers/postView")
// import { MyBooks } from "../controllers/ProfileController";
const createComment = require("../controllers/handleComment")

// middleware
router.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const { protect } = require("../helper/authmiddleware");
// const createPost = require("../controllers/createPost");
// const createPost = require("../controllers/createPost");

router.post("/signup", signupUser);
router.post("/test", protect, test);
router.post("/login", loginUser);
router.post("/add_book", protect, addBookAuthor);

router.get("/BookList", displayBookAuthor);
router.get("/PostView", viewPost);
router.get("/give_file/:name", file_u);
router.post("/Book_add_author", add_book_author);
router.get("/bookDetailFetch/:isbn", bookDetailFetch);
router.post("/add_book_detail_sell", protect, add_book_sell);
router.get("/:id/verify/:token/", tokenVerify);
router.get("/me", protect, getMe);
router.post("/edit_details", protect, editDetails);
router.get("/MyBookList", protect, myBooks);
router.post("/update_pro_img", protect, update_pro_img);
router.post("/bid", protect, Bid);
// router.post("/add_book_detail_sell", add_book_sell);

module.exports = router;
