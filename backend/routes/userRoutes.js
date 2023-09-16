const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.detail);
userRouter.post('/seed', userController.userSeeders);

module.exports = userRouter;
