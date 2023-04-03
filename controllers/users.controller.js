const User = require('../models/users.model');

exports.getAllUsers = async (req, res) => {
  const user = await User.findAll({
    where: {
      status: 'available',
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully',
    user,
  });
};
exports.createUsers = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (role !== 'employee' && role !== 'client') {
    return res.status(400).json({
      role,
      status: 'error1',
      message: 'the role has to be equal to client or employee',
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: ' success',
    message: 'the user has been created',
    user,
  });
};
exports.getOneUser = (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    message: 'the query has been done successfully',
    user,
  });
};
exports.updateOneUser = async (req, res) => {
  const { user } = req;

  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'success',
    message: 'the product has been updated',
  });
};
exports.deleteOneUser = async (req, res) => {
  const { user } = req;

  await user.update({
    status: 'unavailable ',
  });
  res.json({
    status: 'success',
    message: `the user has been delete seccessfully`,
  });
};
