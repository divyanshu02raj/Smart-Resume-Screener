const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

exports.getMe = async (req, res) => {
    res.status(200).json(req.user);
};

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.redirect('https://smart-resume-screener-one.vercel.app//login'); }

        const token = generateToken(user);

        res.redirect(`https://smart-resume-screener-one.vercel.app//auth/google/callback?token=${token}`);

    })(req, res, next);
};