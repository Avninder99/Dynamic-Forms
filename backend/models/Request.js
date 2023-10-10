const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    requestedFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {   // pending, approved, rejected
        type: String,
        default: 'pending'
    },
    forWhichForm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    }
})