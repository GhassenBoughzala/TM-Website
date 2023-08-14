const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema({
  email: {
    type: String,
  },
});

module.exports = mongoose.model("Mail", MailSchema);
