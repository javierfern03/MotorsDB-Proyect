const express = require('express');

//CONTROLLERS
const UsersController = require('../controllers/users.controller');

//MIDDLEWARES
const usersMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(UsersController.getAllUsers)
  .post(validationMiddleware.singUpValidation, UsersController.singUp);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  UsersController.login
);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .get(usersMiddleware.validExistUser, UsersController.getOneUser)
  .patch(
    usersMiddleware.validExistUser,
    validationMiddleware.singUpValidation,
    authMiddleware.protectAccountOwner,
    UsersController.updateOneUser
  )
  .delete(
    usersMiddleware.validExistUser,
    authMiddleware.protectAccountOwner,
    UsersController.deleteOneUser
  );

module.exports = router;
