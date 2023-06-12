const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
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
    type: String
  },
  priceDescription: {
    type: String,
    required: true
  },
  image: {
    type: Array,
    required: true,
  },
  sessions: {
    type: Array,
  },
  subscription: {
    type: ObjectId,
    ref: "Subscription",
  },
  status: {
    type: String,
    enum: ["published", "confirmed"],
    default: "published",
  },
});

module.exports = mongoose.model("Course", CourseSchema);
