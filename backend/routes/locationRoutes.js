const locationRouter = require('express').Router();
const locationController = require('../controllers/locationController');

locationRouter.get('/', locationController.getAll);
locationRouter.get('/:id', locationController.detail);

module.exports = locationRouter;
