const router = require('express').Router();
const formControllers = require('../controllers/formControllers');

router
    .route('/generate')
    .post(formControllers.generateForm);
    
router
    .route('/:id')
    .get(formControllers.fetchForm);


module.exports = router;