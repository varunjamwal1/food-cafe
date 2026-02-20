// controllers/authController.js
const User = require("../models/userModel");
const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

/* ================= REGISTER ================= */
const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      return next(createHttpError(400, "All fields are required"));
    }

    const exists = await User.findOne({ email });
    if (exists) return next(createHttpError(400, "User already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  phone,
  email,
  role,
  password,
   role, // ✅ saved now // plain password → schema will hash
});


    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userObj,
    });
  } catch (err) {
    next(err);
  }
};


/* ================= LOGIN ================= */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "Email and password required"));
    }

    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User not found"));

const isMatch = await user.comparePassword(password);

    if (!isMatch) return next(createHttpError(401, "Invalid credentials"));

    const accessToken = jwt.sign(
      { _id: user._id, role: user.role }, // ⭐ include role in token
      config.accessTokenSecret,
      { expiresIn: config.accessTokenExpire }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: config.nodeEnv === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: userObj,
      token: accessToken,
    });
  } catch (err) {
    next(err);
  }
};


const getUserData = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};
const logout=async(req,res,next)=>{
  try{
    res.clearCookie('accessToken')
res.status(200).json({success:true,message:"User Logout Successfully"})
  }  catch (error) {
    next(error);
  }
}

module.exports = { register, login, getUserData,logout };
