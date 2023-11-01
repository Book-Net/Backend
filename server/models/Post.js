const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  //   dateOfCreate: String,
  //   commnets: Number,
  user_id: String,
  // Add other fields as needed
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
