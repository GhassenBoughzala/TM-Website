const { check, validationResult } = require("express-validator");

exports.validateCourse = [
  check("title").notEmpty().withMessage("title is required"),
  check("description").notEmpty().withMessage("description is required"),
  //check("price").notEmpty().withMessage("description is required"),
  check("priceDescription").notEmpty().withMessage("description is required"),
  //check("image").notEmpty().withMessage("image is required")
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
