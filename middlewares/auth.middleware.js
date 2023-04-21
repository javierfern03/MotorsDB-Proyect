const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in!, Please log in to get access',
    });
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      status: 'available',
      id: decoded.id,
    },
  });

  if (!user) {
    return res.status(401).json({
      status: 'error',
      message: 'User not fount',
    });
  }

  req.sessionUser = user;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return res.status(401).json({
        status: 'error',
        message: 'You do not have permission to perform this action!',
      });
    }
    next();
  };
};

exports.protectAccountOwner = async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return res.status(401).json({
      status: 'error',
      message: 'You do not own this account',
    });
  }
  next();
};
