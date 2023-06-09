const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose.Schema;

const UsersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      /* Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character */
      match: [/^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
    },
    phone: { type: String },
    city: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    booking: {
      type: ObjectId,
      ref: "Booking",
    },
  },
  { timestamps: true }
);

UsersSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    console.error(error);
    throw error;
  }
});

UsersSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = mongoose.model("Users", UsersSchema);
