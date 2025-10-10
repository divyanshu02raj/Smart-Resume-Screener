const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resumeText: {
        type: String,
        required: true
    },
    screeningResult: {
        match_score: Number,
        justification: String,
        candidate_skills: [String],
        missing_skills: [String]
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Candidate', CandidateSchema);