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
    enum: ["pending", "test", "request", "confirmed"],
  },
  type: {
    type: String,
    enum: ["Private", "Evening"],
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
  title: {
    type: String,
  },
  hours: {
    type: Number,
  },
  topay: {
    type: Number,
  },
  sessions: {
    type: Array,
  },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
