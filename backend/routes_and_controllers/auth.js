const User = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");
require('dotenv').config();
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("Register Request Body:", req.body);
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      console.log("User already exists:", req.body.email);
      return res.send({
        success: false,
        message: "The user already exists!",
      });
    }
    const salt = await bcrypt.genSalt(1);
    const hashPwd = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPwd;
    const newUser = new User(req.body);
    await newUser.save();
    console.log("New User Registered:", req.body.email);
    res.send({
      success: true,
      message: "You've successfully signed up",
    });
  } catch (err) {
    console.log("Error in /register:", err);
    res.status(500).send({
      success: false,
      message: "An error occurred during registration",
    });
  }
});

router.post("/login", async (req, res) => {
  console.log("Login Request Body:", req.body);
  
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User does not exist:", req.body.email);
      return res.send({
        success: false,
        message: "User does not exist. Please Register",
      });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log("Invalid password for user:", req.body.email);
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.secret_key_jwt, { expiresIn: "1d" });
    console.log("User logged in successfully:", req.body.email);

    res.send({
      success: true,
      message: "You've successfully logged in!",
      token: token,
    });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred during login",
    });
  }
});

module.exports = router;
