const Book = require("../models/Book");

const MyBooks = async (req, res) => {
  try {
    console.log("hariiiiiiiiiiiiiiiiiii");
    // const user = req.user;
    // const u_id = user._id.toString();
    // const books = await Book.findById(u_id);
    // console.log(books);

    // if (books) {
    //   console.log("User books:", books);
    //   return res.json({ books: books });
    // } else {
    //   console.log("User not found");
    //   res.status(404).json({ error: "books not found" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// try {
//     console.log("object");
//     const user = req.user;
//     const u_id = user._id.toString();

//     const foundUser = await User.findById(u_id);

//     if (foundUser) {
//       console.log("User details:", foundUser);
//       return res.json({ user: foundUser });
//     } else {
//       console.log("User not found");
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ error: "An error occurred in the test function." });
//   }

module.exports = MyBooks;
