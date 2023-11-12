const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.detail);

module.exports = userRouter;
