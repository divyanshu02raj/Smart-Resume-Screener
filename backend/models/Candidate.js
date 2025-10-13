const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    // 'user' and 'jobDescription' are removed from this model.
    // They will be stored in the parent 'ScreeningBatch' model.
    
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
        // Added to store the detailed score breakdown
        criteria_scores: mongoose.Schema.Types.Mixed, 
    },
}, {
    // The `timestamps: true` option automatically adds `createdAt` and `updatedAt` fields.
    // This replaces the need for the old 'uploadDate' field.
    timestamps: true,
});

module.exports = mongoose.model('Candidate', CandidateSchema);
