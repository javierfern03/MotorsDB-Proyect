const express = require('express');

//CONTROLLERS
const UsersController = require('../controllers/users.controller');

//MIDDLEWARES
const usersMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validationsMiddleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(UsersController.getAllUsers)
  .post(usersMiddleware.validUsers, UsersController.singUp);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  UsersController.login
);

router
  .route('/:id')
  .get(usersMiddleware.validExistUser, UsersController.getOneUser)
  .patch(
    usersMiddleware.validExistUser,
    usersMiddleware.validUsers,
    authMiddleware.protectAccountOwner,
    UsersController.updateOneUser
  )
  .delete(
    usersMiddleware.validExistUser,
    authMiddleware.protectAccountOwner,
    UsersController.deleteOneUser
  );

module.exports = router;
