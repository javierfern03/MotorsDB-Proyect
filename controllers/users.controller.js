const User = require('../models/users.model');

exports.getAllUsers = async (req, res) => {
  const user = await User.findAll({
    where: {
      status: 'available',
    },
  });

  res.status(200).json({
    status: "success",
    message: 'The query has been done successfully',
    user
  });
};
exports.createUsers = async (req, res) => {
  const { name, email, password, role } = req.body;

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
  console.log(req.params);
  res.json({
    message: 'hello from the get-user router by id',
  });
};
exports.updateOneUser = (req, res) => {
  res.json({
    message: 'hello from the patch-user router',
  });
};
exports.deleteOneUser = (req, res) => {
  res.json({
    message: 'hello from the delete-user router',
  });
};
