const express = require('express');
const router = express.Router();
const StudentData = require('../models/StudentData');
const User = require('../models/User');

// Middleware to checking Auth would go here (simplified for now)

// GET /api/student/profile/:username
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.params.username
        });
        if (!user) return res.status(404).json({
            msg: 'User not found'
        });

        const studentData = await StudentData.findOne({
            user: user._id
        });

        if (!studentData) {
            // Return basic user info if no academic record exists yet
            return res.json({
                profile: user,
                academic: null
            });
        }

        res.json({
            profile: user,
            academic: studentData
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;