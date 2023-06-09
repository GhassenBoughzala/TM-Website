const express = require("express");
const router = express.Router();
const Courses = require("../models/Courses");
const { verifyAccessToken } = require("../middleware/verify-token");
const {
  validateCourses,
  isRequestValidated,
} = require("../middleware/validatorCourses");
const AdminAccess = require("../middleware/adminAuth");

// @route   POST api/addcourse
// @desc    Create Course
// @access  Private Admin
router.post(
  "/",
  verifyAccessToken,
  validateCourses,
  AdminAccess,
  isRequestValidated,
  async (req, res) => {
    try {
      let { title, description, price, priceDescription, image, sessions } = req.body;
      const exist = await Courses.findOne({ title });
      if (exist) {
        return res.status(400).json({
          error: true,
          msg: "Course existes",
        });
      }
      const newCourse = new Courses({ title, description, price, priceDescription, image, sessions });
      newCourse.save().then(()=> res.json(newCourse))
    } catch (error) {
      res.status(500).json({
        error: true,
        msg: "server error",
      });
      console.log(error);
    }
  }
);

module.exports = router;
