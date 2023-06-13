const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SubscriptionSchema = new mongoose.Schema(
  {
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
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      require: true,
    },
  });

module.exports = mongoose.model("Subscription", SubscriptionSchema);
