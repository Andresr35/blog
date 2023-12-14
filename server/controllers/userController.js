const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../jwt");

exports.postLogIn = asyncHandler(async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Auth Failed, Username not found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Auth Failed, Incorrect Password",
      });
    }
    const opts = {};
    opts.expiresIn = 120;
    const secret = process.env.TOKEN_SECRET;
    const token = jwt.sign({ username }, secret, opts);
    return res.status(200).json({
      message: "Auth Passed",
      token,
    });
  } catch (err) {
    res.status(401).json({
      message: "Missing login info",
      error: err.message,
    });
  }
});

exports.getTest = [
  authenticateToken,
  asyncHandler(async (req, res, next) => {
    res.send("You were authenticated!");
  }),
];
