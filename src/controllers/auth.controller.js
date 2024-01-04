const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .send("All field are required: username, email, password");
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    // send controled response
    res.status(201).json({
      message: "New user successfully registered",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    // Specific error managment (example: duplcate email)
    if (error.code === 11000) {
      return res.status(400).send("Email is already in use");
    }

    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Srror"
        : error.message;
    res.status(500).json({
      message: "Authentication Error",
      error: errorMessage,
    });
  }
};

const login = (req, res) => res.send("loginnn");

module.exports = { register, login };
