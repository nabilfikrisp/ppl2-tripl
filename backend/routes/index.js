const router = require('express').Router();
const authRouter = require('./authRoutes');
const locationRouter = require('./locationRoutes');
const planRouter = require('./planRoutes');
const userRouter = require('./userRoutes');

router.get('/', (requrest, response) => {
  response.send('<h1>Hello Guys</h1>');
});

router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/plans', planRouter);
router.use('/api/locations', locationRouter);

module.exports = router;
