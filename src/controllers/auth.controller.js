const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt");

// register Controller

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All field are required: username, email, password" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: passwordHash });
    await newUser.save();
    const token = createAccessToken({ id: newUser._id });

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
    // Specific error managment (example: duplicate email)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or username is already in use" });
    }

    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Authentication Error :" + errorMessage,
    });
  }
};

// login Controller

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All field are required: email and password" });
    }

    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = createAccessToken({ id: userFound._id });

    // Create token cookie and send controled response
    res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .status(201)
      .json({
        message: "User successfully logged",
        user: {
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          createdAt: userFound.createdAt,
          updatedAt: userFound.updatedAt,
        },
      });
  } catch (error) {
    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Authentication Error :" + errorMessage,
    });
  }
};

// logout Controller

const logout = (req, res) => {
  try {
    res
      .cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Failed to logout, Error: " + errorMessage,
    });
  }
};

// profile Controller

const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    // Hide production errors details
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message;
    res.status(500).json({
      message: "Failed to get the user profile, Error: " + errorMessage,
    });
  }
};

module.exports = { register, login, logout, profile };
