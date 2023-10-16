const router = require('express').Router();
const responseControllers = require('../controllers/responseController');
const auth = require('../middlewares/auth');
const response = require('../middlewares/response');
const form = require('../middlewares/form')

router
    .route('/generate')
    .post(auth.isLoggedIn, response.responseStructureValidator, responseControllers.generateResponse);
    
router
    .route('/fetchAll')
    .get(auth.isLoggedIn, responseControllers.fetchMyResponses);
    
// what middleware does this need ?
router
    .route('/:responseId')
    .get(auth.isLoggedIn, response.hasAccess, responseControllers.fetchResponse);

router
    .route('/:formid/responses')
    .post(auth.isLoggedIn, form.hasEditAccess, responseControllers.fetchAllResponses);



module.exports = router;