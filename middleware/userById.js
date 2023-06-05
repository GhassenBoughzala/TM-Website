const mongoose = require("mongoose");
const User = require("../models/Users");

module.exports = async function (req, res, next) {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(403).json({
      error: "User not founded",
    });
  }

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({
        error: "User not founded",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
