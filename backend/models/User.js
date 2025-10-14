const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: {
    type: String,
    },
    name: {
    type: String,
    required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [
            function() { 
                return !this.googleId; 
            }, 
            'Please provide a password for email sign-up.'
        ],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);