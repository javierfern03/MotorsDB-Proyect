const Repair = require('../models/repairs.model');

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
