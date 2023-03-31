exports.getAllRepairs = (req, res) => {
  res.json({
    messge: 'hello from the get-repairs router ',
  });
};

exports.createReapairs = (req, res) => {
  res.json({
    messge: 'hello from the post-repairs router',
  });
};

exports.getOneRepair = (req, res) => {
  console.log(req.params)
  res.json({
    messge: 'hello from the get-repair by id',
  });
};

exports.updateOneRepair = (req, res) => {
  res.json({
    messge: 'hello from the patch-repair by id',
  });
};

exports.deleteOneRepair = (req, res) => {
  res.json({
    messge: 'hello from the delete-repair by id',
  });
};
