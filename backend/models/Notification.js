const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
