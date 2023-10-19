const { fetchUser } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');

const router = require('express').Router();

router
    .route('/')
    .get(auth.isLoggedIn, fetchUser);

module.exports = router;