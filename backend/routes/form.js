const router = require('express').Router();
const formControllers = require('../controllers/formControllers');
const auth = require('../middlewares/auth');

router
    .route('/generate')
    .post(auth.isLoggedIn, formControllers.generateForm);
    
router
    .route('/:id')
    .get(auth.isLoggedIn, formControllers.fetchForm);


module.exports = router;