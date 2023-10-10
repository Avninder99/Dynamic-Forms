const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: 'Choose not to share'
    },
    createdForms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Form'
        }
    ],
    myResponses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Response'
        }
    ],
    accessControlRequestsRecieved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Request'
        }
    ],
    accessControlRequestsSent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Request'
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);