const Post = require("../models/Post")

const createPost = async (req, res) => {
    
      // Get post data from the request body
    //   const { title, description, user_id } = req.body;
  
      // Create a new post using the Post model
      Post.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id
      })
        .then((newPost) => {
          console.log('Post created successfully:', newPost);
          res.status(201).json({ message: 'Post created successfully', post: newPost });
        })
        .catch((error) => {
          console.error('Error creating post:', error);
          res.status(500).json({ error: 'An error occurred while creating the post' });
        });
    
    }
  module.exports = createPost;