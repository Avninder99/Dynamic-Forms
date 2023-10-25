const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        // unique: true,
        // required: true
        default: 'an-id'
    },
    formAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    formResponder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    relatedForm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);