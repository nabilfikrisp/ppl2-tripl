const router = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');

router.get('/', (requrest, response) => {
  response.send('<h1>Hello Bang</h1>');
});

router.get('/test', (request, response) => {
  response.json({ message: 'test routing' });
});

router.post('/api/token', userExtractor, (request, response) => {
  response.json('jsonwebtoken work!');
});

router.use('/api', authRouter);
router.use('/api/users', userRouter);

module.exports = router;
