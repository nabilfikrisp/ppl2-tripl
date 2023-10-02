const planRouter = require('express').Router();
const planController = require('../controllers/planController');
const { userExtractor } = require('../utils/middleware');

planRouter.get('/', planController.getAll);
planRouter.get('/me', userExtractor, planController.myPlan);
planRouter.get('/:id', planController.detail);
planRouter.post('/', userExtractor, planController.save);
planRouter.put('/:id', userExtractor, planController.update);

module.exports = planRouter;
