const router = require('express').Router();
const formRoutes = require('./form');


router.use('/form', formRoutes);

module.exports = router;
