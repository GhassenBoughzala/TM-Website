const mongoose = require("mongoose");


const ScholarshipsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  cv: {
    type: String,
    required: false,
  },
  lettreMotivation: {
    type: String,
    required: false,
  },
  msg: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Scholarship", ScholarshipsSchema);
