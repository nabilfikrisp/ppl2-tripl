const router = require('express').Router();

router.get('/', (requrest, response) => {
  response.send('<h1>Hello Bang</h1>');
});

router.get('/test', (request, response) => {
  response.json({ message: 'test routing' });
});

module.exports = router;
