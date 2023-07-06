const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyAccessToken } = require("../middleware/verify-token");

// @route   GET /user
// @desc    Get User Information by token
// @access  Public
router.get("/", verifyAccessToken, async (req, res) => {
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

// @route   UPDATE /user
// @desc    Update User infos
// @access  Public
router.put("/", verifyAccessToken, async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      city: req.body.city
    };
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: body },
      { new: true }
    );
    const user = await User.findById(updated.id)
      .select("-password")
      .select("-role");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
    console.log(err);
  }
});

// @route   GET api/all
// @desc    Get Courses
// @access  Public
router.get("/all", async (req, res) => {
  try {
    let users = await User.find({}).select("-subscription");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "server error",
    });
  }
});

module.exports = router;
