const router = require('express').Router();
const formRoutes = require('./form');
const authRoutes = require('./auth');
const responseRoutes = require('./response');
const userRoutes = require('./user');

router.use('/form', formRoutes);
router.use('/auth', authRoutes);
router.use('/response', responseRoutes);
router.use('/user', userRoutes);

module.exports = router;
