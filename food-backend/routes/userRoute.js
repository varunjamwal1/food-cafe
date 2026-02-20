// routes/userRoutes.js
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserData,
  logout
} = require("../controllers/userController");

const { isVerifiedUser } = require("../middleware/tokenVerification");

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout",   logout);
// Protected route
router.get("/", isVerifiedUser, getUserData);

module.exports = router;
