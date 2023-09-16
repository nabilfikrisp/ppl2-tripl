const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getAll);
userRouter.post('/seed', userController.userSeeders);

module.exports = userRouter;
