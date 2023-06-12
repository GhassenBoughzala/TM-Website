const { check, validationResult } = require("express-validator");

exports.validateSubscription = [
  check("level").notEmpty().withMessage("level is required"),
  check("phone").notEmpty().withMessage("phone is required"),
  check("city").notEmpty().withMessage("city is required")
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
