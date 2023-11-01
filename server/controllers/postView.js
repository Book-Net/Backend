const Post = require("../models/Post")

const postView = async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
      console.log(posts)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred in viewing posts' });
    }
  };
  

  module.exports = postView