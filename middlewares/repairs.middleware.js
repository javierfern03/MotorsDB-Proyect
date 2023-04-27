const Repair = require('../models/repairs.model');
const User = require('../models/users.model');

exports.validExistReapair = async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'the repair not fount',
    });
  }
  req.repair = repair;
  next();
};

exports.findOneRepair = async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
    include: [{ model: User, attributes: ['id', 'name', 'role', 'email'] }],
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'the repair not fount',
    });
  }
  req.oneRepair = repair;
  next();
};
