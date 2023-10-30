const Chat = require("../models/Chat");
const Notification = require("../models/Notification");
const User = require("../models/User");

const notificationControllers = {
    fetchUserNotifications: async (req, res) => {
        try {
            const userId = req.body.decoded.id;

            let foundNotifications = await Notification.find({ reciever: userId }).select('_id formId reciever message').populate('formId', ' _id title').lean();
            console.log("foundNotifications -> ", foundNotifications);
            
            foundNotifications = JSON.parse(JSON.stringify(foundNotifications));
            
            // testing code
            // const newFoundNotifications = foundNotifications.map((notification) => {
            //     const holder = notification.formId.title;
            //     const message = notification.message;
            //     // console.log("here1 - ", holder);
            //     const updatedTitle = `${holder}_${message}`;
            //     notification.formId.title = updatedTitle;
            //     return notification;
            // })
            // console.log("foundNotifications -> ", newFoundNotifications);
            
            return res.status(200).json({
                message: 'success',
                notifications: foundNotifications
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },

    // yet to be connected and tested
    deleteNotification: async (req, res) => {
        try {
            const userId = req.body.decoded.id, notificationId = req.body.notificationId;
            const deleteRes = await Notification.deleteOne({ _id: notificationId });
    
            console.log(deleteRes);
    
            return res.status(200).json({
                message: 'Notification deleted'
            });
        } catch(error) {
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    }
}

module.exports = notificationControllers;