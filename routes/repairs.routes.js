const express = require('express');

//CONTROLLERS
const repairsController = require('../controllers/repairs.controller');

//MIDDLEWARES
const repairMiddleware = require('../middlewares/repairs.middleware');
const autMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/').post(repairsController.createReapairs);

router.use(autMiddleware.protect);
router.use(autMiddleware.restrictTo('employee'));

router.route('/').get(repairsController.getAllRepairs);

router
  .route('/:id')
  .get(repairMiddleware.validExistReapair, repairsController.getOneRepair)
  .patch(repairMiddleware.validExistReapair, repairsController.updateOneRepair)
  .delete(
    repairMiddleware.validExistReapair,
    repairsController.deleteOneRepair
  );

module.exports = router;
