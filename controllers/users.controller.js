const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const generateJwt = require('../utils/jwt');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
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
});

exports.singUp = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(password);
  if (role !== 'employee' && role !== 'client') {
    return res.status(400).json({
      role,
      status: 'error1',
      message: 'the role has to be equal to client or employee',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
    role,
  });

  const token = await generateJwt(user.id);

  res.status(201).json({
    status: ' success',
    message: 'the user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.getOneUser = catchAsync(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message: 'the query has been done successfully',
    user,
  });
});

exports.updateOneUser = catchAsync(async (req, res) => {
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
});

exports.deleteOneUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({
    status: 'unavailable ',
  });
  res.json({
    status: 'success',
    message: `the user has been delete seccessfully`,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      status: 'available',
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({
      status: 'error',
      message: 'User not fount',
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'email or password incorrect',
    });
  }

  const token = await generateJwt(user.id);

  res.status(200).json({
    status: 'success',
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
