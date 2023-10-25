const { fetchAllMyConversations, fetchMyChatsForSingleConversation } = require('../controllers/chatControllers');
const auth = require('../middlewares/auth');
const router = require('express').Router();

router
    .route('/')
    .get(auth.isLoggedIn, fetchAllMyConversations);

router
    .route('/:conversationId')
    .get(auth.isLoggedIn, fetchMyChatsForSingleConversation);

module.exports = router;