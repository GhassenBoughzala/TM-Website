const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  course: {
    type: ObjectId,
    ref: "Course",
  },
  payment: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "test", "confirmed"],
    default: "pending",
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    require: true,
  },
  notes: {
    type: String,
    require: true,
  },
  sessions: {
    type: Array,
  },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
