const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.singUpValidation = [
  body('name').notEmpty().withMessage('The name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role').notEmpty().withMessage('The role cannot be empty'),
  validFields,
];

exports.createRepairValidation = [
  body('date').notEmpty().withMessage('The date cannot be empty'),
  body('userId').notEmpty().withMessage('userId cannot be empty'),
  body('motorsNumber').notEmpty().withMessage('motorsNumber cannot be empty'),
  body('description').notEmpty().withMessage('description cannot be empty'),
  validFields,
];
