const user = require('../models/users.model');

exports.validUsers = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'the name is required',
    });
  }
  if (!email) {
    return res.status(400).json({
      status: 'error',
      message: 'the email is required',
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 'error',
      message: 'the password is required',
    });
  }

  if (!role) {
    return res.status(400).json({
      status: 'error',
      message: 'the role is required',
    });
  }
  if (!role == 'client' || !role == 'employee') {
    return res.status(400).json({
      status: 'error',
      message: 'the role has to be equal to client or employee',
    });
  }

  next();
};
