const Repair = require('../models/repairs.model');
const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllRepairs = catchAsync(async (req, res) => {
  const repair = await Repair.findAll({
    where: {
      status: 'pending',
    },
    include: [{ model: User, attributes: ['id', 'name', 'role', 'email'] }],
  });

  res.json({
    status: 'success',
    messge: 'The query has been done successfully',
    repair,
  });
});

exports.createReapairs = catchAsync(async (req, res) => {
  const { date, userId, description, motorsNumber } = req.body;

  await Repair.create({
    date,
    userId,
    motorsNumber,
    description,
  });

  res.json({
    status: 'success',
    messge: 'the Product has been created',
  });
});

exports.getOneRepair = catchAsync(async (req, res) => {
  const { oneRepair } = req;

  res.status(200).json({
    status: 'success',
    message: 'the query has been done successfully',
    repair: oneRepair,
  });
});

exports.updateOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: 'completed',
  });

  res.json({
    status: 'success',
    messge: 'the product has been updated',
  });
});

exports.deleteOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  if (repair.status == 'completed') {
    return res.status(400).json({
      status: 'error',
      message: 'the repair is over',
    });
  }

  await repair.update({
    status: 'cancelled',
  });

  res.status(200).json({
    status: 'success',
    messge: `The product has been delete seccessfully`,
  });
});
