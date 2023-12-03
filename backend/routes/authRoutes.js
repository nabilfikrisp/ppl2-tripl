const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/google', authController.loginByGoogle);
authRouter.post('/forgot-password', authController.passwordReset);
authRouter.post('/reset', authController.handleResetPassword);

module.exports = authRouter;
