const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const {
        username,
        password,
        role,
        fullName
    } = req.body;

    try {
        let user = await User.findOne({
            username
        });
        if (user) {
            return res.status(400).json({
                msg: 'User already exists'
            });
        }

        user = new User({
            username,
            password, // NOTE: Password hashing should be implemented with bcryptjs
            role,
            fullName
        });

        await user.save();
        res.status(201).json({
            msg: 'User registered successfully',
            user: {
                username,
                role,
                fullName
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const {
        username,
        password,
        role
    } = req.body;

    try {
        let user = await User.findOne({
            username
        });

        // If user doesn't exist, auto-create them (for development)
        if (!user) {
            user = new User({
                username,
                password: password || '1234',
                role: role || 'student',
                fullName: username
            });
            await user.save();
            console.log('Auto-created user:', username);
        }

        // No password check for now (development mode)
        // No role check for now (development mode)

        // Return user data
        res.json({
            msg: 'Login Successful',
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                fullName: user.fullName
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;