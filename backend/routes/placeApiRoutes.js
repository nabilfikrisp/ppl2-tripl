const placeApiRouter = require('express').Router();
const placeApiController = require('../controllers/placeApiController');

placeApiRouter.get('/', placeApiController.getAllByApi);

module.exports = placeApiRouter;
