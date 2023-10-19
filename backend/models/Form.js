const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    mode: {
        type: String,
        default: 'draft'    // draft, active, inactive
    },
    editors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    fields: [
        {
            id: String,
            question: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'text'
            },
            options: [{
                type: String
            }],
            answer: [{
                type: String
            }],
            isRequired: {
                type: Boolean,
                default: false
            }
        }
    ],
    responses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Response'
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('Form', formSchema);