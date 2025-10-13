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
    jobTitle: {
        type: String,
        default: 'Untitled Screening',
    },
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('ScreeningBatch', screeningBatchSchema);