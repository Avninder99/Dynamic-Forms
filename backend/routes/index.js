const router = require('express').Router();
const formRoutes = require('./form');
const authRoutes = require('./auth');
const responseRoutes = require('./response');
const userRoutes = require('./user');
const chatRoutes = require('./chat');
const notificationRoutes = require('./notification');

router.use('/form', formRoutes);
router.use('/auth', authRoutes);
router.use('/response', responseRoutes);
router.use('/user', userRoutes);
router.use('/chats', chatRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
