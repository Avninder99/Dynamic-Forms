const { fetchUserNotifications, deleteNotification } = require('../controllers/notificationController');
const auth = require('../middlewares/auth');
const router = require('express').Router();

router
    .route('/')
    .get(auth.isLoggedIn, fetchUserNotifications);

router
    .route('/:notificationId/delete')
    .post(auth.isLoggedIn, deleteNotification);

module.exports = router;