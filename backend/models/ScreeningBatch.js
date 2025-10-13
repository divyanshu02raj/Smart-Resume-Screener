const mongoose = require('mongoose');

const screeningBatchSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    jobDescription: {
        type: String,
        required: true,
    },
    // We can add a title for easier display, which we'll get from the AI
    jobTitle: {
        type: String,
        default: 'Untitled Screening',
    },
    // An array of references to the individual candidate documents
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('ScreeningBatch', screeningBatchSchema);