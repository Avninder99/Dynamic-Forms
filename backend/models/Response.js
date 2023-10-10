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
            question: String,
            field_type: {
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
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Response', responseSchema);