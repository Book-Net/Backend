const Comment = require("../models/Comment")

const createComment = async (req, res) => {
    console.log("Here comment")
    console.log("Here comment data : ", req.body)
      // Get post data from the request body
    //   const { title, description, user_id } = req.body;
  
      // Create a new post using the Post model
      Comment.create({
        name: req.body.name,
        comment: req.body.newComment,
        userId: req.body.u_id
      })
        .then((newComment) => {
          console.log('Comment created successfully:', newComment);
          res.status(201).json({ message: 'Comment created successfully', post: newPost });
        })
        .catch((error) => {
          console.error('Error creating Comment:', error);
          res.status(500).json({ error: 'An error occurred while creating the Comment' });
        });
    
    }
  module.exports = createComment;