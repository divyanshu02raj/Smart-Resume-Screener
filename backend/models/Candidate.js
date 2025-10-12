const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // This creates the link to the User model
    },
    jobDescription: {
        type: String,
        required: true
    },
    resumeText: {
        type: String,
        required: true
    },
    screeningResult: {
        candidate_name: String,
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