const { fetchSingleFormChats } = require('../controllers/chatControllers');
const auth = require('../middlewares/auth');
const router = require('express').Router();

router
    .route('/:formId')
    .get(auth.isLoggedIn, fetchSingleFormChats);

module.exports = router;