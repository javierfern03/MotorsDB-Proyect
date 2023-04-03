const Repair = require('../models/repairs.model');

exports.getAllRepairs = async (req, res) => {
  const repair = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });
  res.json({
    status: 'success',
    messge: 'The query has been done successfully',
    repair,
  });
};

exports.createReapairs = async (req, res) => {
  const { date, userId } = req.body;
  await Repair.create({
    date,
    userId,
  });
  res.json({
    status: 'success',
    messge: 'the Product has been created',
  });
};

exports.getOneRepair = (req, res) => {
  const { repair } = req;
  res.status(200).json({
    status: 'success',
    message: 'the query has been done successfully',
    repair,
  });
};

exports.updateOneRepair = async (req, res) => {
  const { repair } = req;
  await repair.update({
    status: 'completed',
  });
  res.json({
    status: 'success',
    messge: 'the product has been updated',
  });
};

exports.deleteOneRepair = async (req, res) => {
  const { repair } = req;
  const { status } = req.body;
  if (status == 'completed') {
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
};
