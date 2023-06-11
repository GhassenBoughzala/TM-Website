const mongoose = require("mongoose");
const Course = require("../models/Course");

module.exports = async function (req, res, next) {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(403).json({
      error: "Course not founded",
    });
  }

  try {
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(403).json({
        error: "Course not founded",
      });
    }

    req.course = course;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
