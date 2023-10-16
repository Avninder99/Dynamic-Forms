const router = require('express').Router();
const formRoutes = require('./form');
const authRoutes = require('./auth');
const responseRoutes = require('./response');


router.use('/form', formRoutes);
router.use('/auth', authRoutes);
router.use('/response', responseRoutes);

module.exports = router;
