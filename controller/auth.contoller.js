const express = require("express");
const router = express.Router();
const deco = require("jwt-decode");
const User = require("../models/User");
const {
  validateSigninRequest,
  validateSignupRequest,
  isRequestValidated,
} = require("../middleware/validatorAuth");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} = require("../middleware/verify-token");

// @route   POST /register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  validateSignupRequest,
  isRequestValidated,
  async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: true,
        msg: "Utilisateur existe déjà",
      });
    } else {
      try {
        user = new User({ firstName, lastName, email, password });
        const savedUser = await user.save();
        if (!savedUser) {
          throw Error("Something went wrong saving the user");
        } else {
          const accessToken = await signAccessToken(savedUser.id);
          const refreshToken = await signRefreshToken(savedUser.id);
          var date = new Date();
          const time = deco(accessToken);
          const expiresIn = new Date(date.getHours() + time.exp * 1000);
          res.status(200).json({
            accessToken,
            expiresIn,
            refreshToken,
            //msg: "Go verify your account !",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: true,
          msg: "Erreur lors de l'inscription",
        });
      }
    }
  }
);

// @route   POST /login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  validateSigninRequest,
  isRequestValidated,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          error: true,
          msg: "Email incorrect",
        });
      }
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return res.status(400).json({
          error: true,
          msg: "Mot de passe incorrect",
        });
      } else {
        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);
        var date = new Date();
        const time = deco(accessToken);
        const expiresIn = new Date(date.getHours() + time.exp * 1000);
        if (user.role == "user") {
          res.status(200).json({ accessToken, expiresIn, refreshToken });
        } else if (user.role == "admin") {
          res
            .status(200)
            .json({ accessToken, expiresIn, refreshToken, access: true });
        }
      }
    } catch (err) {
      res.status(500).json({
        error: true,
        msg: "Server error",
      });
      console.log(err);
    }
  }
);

// @route   GET /user
// @desc    User Information by token
// @access  Public
router.get("/getuser", verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
    console.log(error);
  }
});

// @route   POST /refresh-token'
// @desc    Get new Acc Token
// @access  Public
router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    var date = new Date();
    const time = deco(accessToken);
    const expiresIn = new Date(date.getHours() + time.exp * 1000);
    res.status(200).json({ accessToken, expiresIn });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
    next(error);
  }
});

module.exports = router;
