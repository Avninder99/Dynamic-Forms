const { login, register, googleAuthHandler, accountActivation, googleAuthFailureHandler } = require('../controllers/authControllers');
const auth = require('../middlewares/auth');

const router = require('express').Router();
const passport = require('passport');
require('../utils/passport');

router
    .route('/login')
    .post(auth.loginSanitizer, login);

router
    .route('/register')
    .post(auth.registerSanitizer, register);

router
    .route('/google')
    .get( passport.authenticate('google', { scope: ['profile', 'email'] }) );

router
    .route('/google/callback')
    .get( passport.authenticate('google', { session: false, failureRedirect: '/api/auth/google/failed' }), googleAuthHandler);

router
    .route('/google/failed')
    .get(googleAuthFailureHandler)

router
    .route('/accountActivation/:slug')
    .get(accountActivation);

module.exports = router;