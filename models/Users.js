const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/],
    },
    phone: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
  },
  { timestamps: true }
);

UsersShema.pre("save", async function (next) {
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

UsersShema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = mongoose.model("Users", UsersSchema);
