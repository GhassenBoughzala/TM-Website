const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    requi
  },
  priceDescription: {
    type: String
  },
  image: {
    type: Array,
    required: true,
  },
  sessions: {
    type: Object,
  },
  status: {
    type: String,
    enum: ["published", "closed"],
    default: "published",
  },
});

module.exports = mongoose.model("Courses", CoursesSchema);
