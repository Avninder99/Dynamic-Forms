const router = require('express').Router();
const formControllers = require('../controllers/formControllers');
const auth = require('../middlewares/auth');
const form = require('../middlewares/form');

router
    .route('/generate')
    .post(auth.isLoggedIn, form.formStructureValidator, formControllers.generateForm);
    
router
    .route('/fetchAll')
    .get(auth.isLoggedIn, formControllers.fetchAllForms);
    
router
    .route('/:id')
    .get(auth.isLoggedIn, formControllers.fetchForm);

router
    .route('/:id/update')
    .post(auth.isLoggedIn, form.hasEditAccess, form.formStructureValidator, formControllers.updateForm);

router
    .route('/:id/delete')
    .delete(auth.isLoggedIn, form.isFormOwner, formControllers.deleteForm);



module.exports = router;