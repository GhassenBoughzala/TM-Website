require("dotenv").config({});
const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/verify-token");
const AdminAccess = require("../middleware/adminAuth");
const {
  isRequestValidated,
} = require("../middleware/validators/validatorCourses");
const Contact = require("../models/Contact");
const { contactUs } = require("../middleware/mailer");
const Mails = require("../models/Mails");

router.put(
  "/",
  verifyAccessToken,
  AdminAccess,
  isRequestValidated,
  async (req, res) => {
    try {
      const updated = await Contact.findByIdAndUpdate(
        "64c69a5691d4d2b7c6156301",
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({
        error: true,
        msg: "server error",
      });
      console.log(error);
    }
  }
);

// @route   GET api/contactId
// @desc    Get Courses
// @access  Public
router.get("/", async (req, res) => {
  try {
    let all = await Contact.findById("64c69a5691d4d2b7c6156301");
    res.status(200).json(all);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "server error",
    });
  }
});

router.post("/send", async (req, res) => {
  try {
    let { firstName, lastName, text, email } = req.body;

    const exist = await Mails.findOne({ email });
    if (exist) {
      return res.status(400).json({
        error: true,
        msg: "This email address is already used !",
      });
    } else {
      const newMail = new Mails({ email });
      await newMail.save();
      await contactUs(text, firstName, lastName, email)
        .then(() => {
          res.status(200).json({
            error: false,
            msg: "Contact us message sent ✔",
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            error: true,
            msg: "Mail error",
          });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Mail error",
    });
  }
});

module.exports = router;
