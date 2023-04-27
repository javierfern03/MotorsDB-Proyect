const User = require('../models/users.model');
const Repair = require('../models/repairs.model');

const initModel = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModel;
