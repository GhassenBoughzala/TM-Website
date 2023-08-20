const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    require: true,
  },
  course: {
    type: ObjectId,
    ref: "Course",
    require: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "test", "confirmed"],
  },
  type: {
    type: String,
    enum: ["private", "Evening"],
    require: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    require: true,
  },
  notes: {
    type: String,
  },
  hours: {
    type: Number,
  },
  sessions: {
    type: Array,
  },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
