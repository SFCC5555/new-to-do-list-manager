const express = require("express");
const {
  register,
  login,
  logout,
  profile,
} = require("../controllers/auth.controller");
const authRequired = require("../middlewares/validateToken");

const router = express.Router(); // Create an instance of an Express router

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

module.exports = router;
