const { login, register } = require('../controllers/authControllers');
const auth = require('../middlewares/auth');

const router = require('express').Router();

router
    .route('/login')
    .post(auth.loginSanitizer, login);

router
    .route('/register')
    .post(auth.registerSanitizer, register);

module.exports = router;