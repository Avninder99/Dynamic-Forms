const router = require('express').Router();
const formControllers = require('../controllers/formControllers');
const auth = require('../middlewares/auth');
const form = require('../middlewares/form');
const user = require('../middlewares/user');

router
.route('/generate')
.post(auth.isLoggedIn, form.formStructureValidator, user.editorsValidator, formControllers.generateForm);

router
.route('/fetchAll')
.get(auth.isLoggedIn, formControllers.fetchAllForms);

router
    .route('/fetchSharedForms')
    .get(auth.isLoggedIn, formControllers.fetchSharedForms);
    
// this fetches the form data with limited data for show page
router
.route('/:id')
.get(auth.isLoggedIn, formControllers.fetchFormBasic);

// this fetches form data without filtering the secure fields
router
    .route('/:id/complete')
    .get(auth.isLoggedIn, form.hasEditAccess, formControllers.fetchFormComplete);

router
    .route('/:id/update')
    .post(auth.isLoggedIn, form.hasEditAccess, form.formAcceptingChanges, form.formStructureValidator, formControllers.updateForm);

router
    .route('/:id/delete')
    .delete(auth.isLoggedIn, form.isFormOwner, formControllers.deleteForm);

router
    .route('/:id/mode/:newMode')
    .post(auth.isLoggedIn, form.isFormOwner, formControllers.modeSwitch);

router
    .route('/:id/patchEditors')
    .post(auth.isLoggedIn, form.hasEditAccess, form.formAcceptingChanges, user.editorsValidator, formControllers.patchFormEditors);


module.exports = router;