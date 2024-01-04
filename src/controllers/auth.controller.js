const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt");

// Register Controller

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .send("All field are required: username, email, password");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: passwordHash });
    await newUser.save();
    const token = await createAccessToken({ id: newUser._id });

    // Create token cookie and send controled response
    res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .status(201)
      .json({
        message: "New user successfully registered",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
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
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Authentication Error",
      error: errorMessage,
    });
  }
};

// login Controller

const login = (req, res) => res.send("login");

module.exports = { register, login };
