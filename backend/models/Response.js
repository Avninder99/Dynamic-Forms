const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    submittedToWhichForm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    },
    fields: [
        {
            // question: String,
            type: {
                type: String,
                default: 'text'
            },
            id: {
                type: String,
                required: true
            },
            // may remove this later
            options: [{
                type: String
            }],
            answer: [],
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Response', responseSchema);