const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    });

    if (user.role !== "admin") {
      return res.status(403).json({
        error: "Admin resources access denied",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
