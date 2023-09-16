const planRouter = require('express').Router();
const planController = require('../controllers/planController');
const { userExtractor } = require('../utils/middleware');

planRouter.get('/', planController.getAll);
planRouter.get('/:id', planController.detail);
planRouter.post('/', userExtractor, planController.save);

module.exports = planRouter;
