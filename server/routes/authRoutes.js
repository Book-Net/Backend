const express = require("express");
const router = express.Router();
const cors = require("cors");
const { signupUser, loginUser } = require("../controllers/authController");

// middleware
router.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
