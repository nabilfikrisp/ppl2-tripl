const placeApiRouter = require('express').Router();
const placeApiController = require('../controllers/placeApiController');

// placeApiRouter.get('/', placeApiController.getAllByApi);
placeApiRouter.get('/scrap', placeApiController.scrapLocations);

module.exports = placeApiRouter;
