const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  mobile: {
    type: String,
  },
  work: {
    type: String,
  },
  other: {
    type: String,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
