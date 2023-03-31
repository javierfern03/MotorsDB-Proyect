const express = require('express');

const repairsController = require('../controllers/repairs.controller');

const router = express.Router();

router
  .route('/')
  .get(repairsController.getAllRepairs)
  .post(repairsController.createReapairs);

router
  .route('/:id')
  .get(repairsController.getOneRepair)
  .patch(repairsController.updateOneRepair)
  .delete(repairsController.deleteOneRepair);

module.exports = router;
