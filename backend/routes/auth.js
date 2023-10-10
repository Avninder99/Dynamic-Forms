const { login, register } = require('../controllers/authControllers');
const auth = require('../middlewares/auth');

const router = require('express').Router();

router
    .route('/login')
    .post(login);

router
    .route('/register')
    .post(register);