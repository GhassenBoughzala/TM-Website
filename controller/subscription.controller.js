const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const Course = require("../models/Subscription");
const { verifyAccessToken } = require("../middleware/verify-token");
const {
  validateSubscription,
  isRequestValidated,
} = require("../middleware/validators/validatorSubs");
const User = require("../models/User");
const adminAuth = require("../middleware/adminAuth");
const { ObjectId } = require("bson");
const transferwise = require("@fightmegg/transferwise");
require("dotenv").config({});

// @route   POST api/
// @desc    Book a course
// @access  Public
router.post(
  "/",
  verifyAccessToken,
  validateSubscription,
  isRequestValidated,
  async (req, res) => {
    try {
      let { course, level } = req.body;
      const selectedUser = await User.findById(req.user.id);
      if (!selectedUser) {
        return res.status(400).json({
          error: true,
          msg: "Error finding user",
        });
      }

      const selectedCourse = await Course.findById(req.body.course);
      if (selectedCourse) {
        return res.status(400).json({
          error: true,
          msg: "Course unavailable",
        });
      }

      const newSubs = new Subscription({
        user: req.user.id,
        course,
        level,
      });

      const verify = await Subscription.find({
        $and: [{ user: req.user.id }, { course: course }],
      });

      if (verify.length == 0) {
        newSubs.save().then(() => res.status(200).json(newSubs));
        await User.findByIdAndUpdate(
          req.user.id,
          { $push: { subscription: newSubs } },
          { new: true }
        );
      } else {
        res.status(400).json({
          error: true,
          msg: "Subscription already exists",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: true,
        msg: "server error",
      });
      console.log(error);
    }
  }
);

// @route   GET api/all
// @desc    Get Subs
// @access  Private Admin
router.get("/all", verifyAccessToken, adminAuth, async (req, res) => {
  try {
    /*     let subs = await Subscription.find({})
      .populate("course", { image: 0, __v: 0 })
      .populate("user", { password: 0, role: 0, __v: 0 }); */
    let usersList = await User.find({})
      .select("-password")
      .select("-__v")
      .populate("subscription");
    res.status(200).json(usersList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "server error",
    });
  }
});

// @route   GET api/byuser
// @desc    Get User Subs
// @access  Public
router.get("/byuser", verifyAccessToken, async (req, res) => {
  try {
    let subs = await Subscription.aggregate([
      { $match: { user: ObjectId(req.user.id) } },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      //cancel some attribute to displays :
      { $project: { icon: 0, __v: 0, slug: 0, updatedAt: 0 } },
      { $project: { course: { __v: 0 } } },
    ]);
    res.status(200).json(subs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "server error",
    });
  }
});

// @route   PUT api/:subId
// @desc    Update Subscription
// @access  Public
router.put("/:subId", verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role == "admin") {
      const updated = await Subscription.findByIdAndUpdate(
        req.params.subId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updated);
    } else {
      const updated = await Subscription.findByIdAndUpdate(
        req.params.subId,
        {
          $set: { level: req.body.level },
        },
        { new: true }
      );
      res.status(200).json(updated);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

// @route   DELETE api/:subsId
// @desc    Delete Subscription
// @access  Public
router.delete("/:subId", verifyAccessToken, async (req, res) => {
  try {
    await Subscription.findByIdAndRemove(req.params.subId);
    res.status(200).json({
      error: false,
      msg: `Deleted successfully`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

// @route   POST api/payment
// @desc    Add payment
// @access  Public
router.post("/payment", async (req, res) => {
  try {
    const client = new transferwise.Client({
      apiKey: process.env.TW_API_KEY,
    });

    const payout = {
      amount: 100,
      currency: "EUR",
      recipient: {
        name: "John Doe",
        account_number: "1234567890",
        bank_code: "000000",
        bic: "WISEBANKGB",
      },
    };

    client.payouts.create(payout, (err, payout) => {
      if (err) {
        console.error(err);
        res.json(err);
      } else {
        console.log(payout);
        res.json(payout);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

module.exports = router;
