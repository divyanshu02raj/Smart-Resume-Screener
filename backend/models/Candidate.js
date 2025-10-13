const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    
    resumeText: {
        type: String,
        required: true,
    },
    screeningResult: {
        candidate_name: String,
        match_score: Number,
        justification: String,
        candidate_skills: [String],
        missing_skills: [String],
        criteria_scores: mongoose.Schema.Types.Mixed, 
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Candidate', CandidateSchema);
