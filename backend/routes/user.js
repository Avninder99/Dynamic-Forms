const { fetchMe, fetchUsers } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');

const router = require('express').Router();

router
    .route('/me')
    .get(auth.isLoggedIn, fetchMe);

router
    .route('/')
    .get(auth.isLoggedIn, fetchUsers);

module.exports = router;