const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');
const { userExtractor } = require('../utils/middleware');

userRouter.get('/', userController.getAll);
userRouter.get('/me', userExtractor, userController.myDetail);
userRouter.get('/:id', userController.detail);

module.exports = userRouter;
