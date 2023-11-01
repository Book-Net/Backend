const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
   name: {
      type: String,
      required: true,
    },
   comment: {
      type: String,
      required: true,
    },
    
  },
   {timestamps: true});

   const commentModel = mongoose.model("Comment", commentSchema)

   module.exports = commentModel;
