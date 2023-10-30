const router = require('express').Router();
const responseControllers = require('../controllers/responseController');
const auth = require('../middlewares/auth');
const response = require('../middlewares/response');
const form = require('../middlewares/form')

// submit a new response and save to database
router
    .route('/generate')
    .post(auth.isLoggedIn, form.formAcceptingResponses, response.responseStructureValidator, response.responseFormatter, responseControllers.generateResponse);
    
// Fetch all of the user's own responses
router
    .route('/fetchAll')
    .get(auth.isLoggedIn, responseControllers.fetchMyResponses);
    
// Fetch a single response from a form user made or has edit access
router
    .route('/:responseId')
    .get(auth.isLoggedIn, response.hasAccess, responseControllers.fetchResponse);

// Fetch all of the responses submitted to a single form (id is formId)
router
    .route('/:id/responses')
    .get(auth.isLoggedIn, form.hasEditAccess, responseControllers.fetchAllResponses);

module.exports = router;