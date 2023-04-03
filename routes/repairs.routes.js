const express = require('express');

const repairsController = require('../controllers/repairs.controller');
const repairMiddleware = require('../middlewares/repairs.middleware');

const router = express.Router();

router
  .route('/')
  .get(repairsController.getAllRepairs)
  .post(repairsController.createReapairs);

router
  .route('/:id')
  .get(repairMiddleware.validExistReapair, repairsController.getOneRepair)
  .patch(repairMiddleware.validExistReapair, repairsController.updateOneRepair)
  .delete(
    repairMiddleware.validExistReapair,
    repairsController.deleteOneRepair
  );

module.exports = router;
