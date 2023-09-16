const planRouter = require('express').Router();
const planController = require('../controllers/planController');

planRouter.get('/', planController.getAll);

module.exports = planRouter;
