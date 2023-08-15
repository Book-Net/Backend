const User = require("../models/user");

const test = (req, res) => {
  res.json("test is working");
};

const signupUser = async (req, res) => {
  try {
    const { userName, email, password, rePassword } = req.body;
    if (!userName || !email || !password || !rePassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long." });
    }

    if (password !== rePassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }
    // check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email already registered" });
    }

    const user = await User.create({ userName, email, password });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while signing up." });
  }
};

module.exports = {
  signupUser,
  test,
};
