const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const BookingSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "Users",
  },
  course: {
    type: ObjectId,
    ref: "Courses",
  },
  payment: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "rejected"],
    default: "pending",
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"]
  },
  
});

module.exports = mongoose.model("Booking", BookingSchema);
