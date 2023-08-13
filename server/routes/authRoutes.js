const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, signupUser } = require("../controllers/authController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "http://loacalhost:3000",
  })
);

router.get("/", test);
router.post("/signup", signupUser);

module.exports = router;
