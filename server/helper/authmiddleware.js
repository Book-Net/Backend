const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers) {
    try {
      // Get token from cookies
      token = req.headers["x-access-token"];
      console.log("header eken token eka awa " + token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      console.log(decoded);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
});

module.exports = { protect };
