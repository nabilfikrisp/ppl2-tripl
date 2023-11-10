const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/google', authController.loginByGoogle);

module.exports = authRouter;
