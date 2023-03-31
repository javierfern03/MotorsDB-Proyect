const express = require('express');

const UsersController = require('../controllers/users.controller');
const usersMiddleware = require('../middlewares/users.middleware')

const router = express.Router();

router
  .route('/')
  .get(UsersController.getAllUsers)
  .post(usersMiddleware.validUsers,UsersController.createUsers);

router
  .route('/:id')
  .get(UsersController.getOneUser)
  .patch(UsersController.updateOneUser)
  .delete(UsersController.deleteOneUser);

module.exports = router;
