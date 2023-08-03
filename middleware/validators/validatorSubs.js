const { check, validationResult } = require("express-validator");

exports.validateSubscription = [
  check("level").notEmpty().withMessage("level is required"),
  check("notes").notEmpty().withMessage("notes is required"),
  check("sessions").notEmpty().withMessage("sessions are required"),
  check("course").notEmpty().withMessage("course is required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
