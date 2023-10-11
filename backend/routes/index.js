const router = require('express').Router();
const formRoutes = require('./form');
const authRoutes = require('./auth');


router.use('/form', formRoutes);
router.use('/auth', authRoutes);

module.exports = router;
