const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const User = require('../models/User');

// GET /api/faculty/classes/:facultyId
router.get('/classes/:facultyId', async (req, res) => {
    try {
        const classes = await Class.find({
            faculty: req.params.facultyId
        });
        res.json(classes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/faculty/class
router.post('/class', async (req, res) => {
    const {
        name,
        facultyId,
        timetable
    } = req.body;
    try {
        const newClass = new Class({
            name,
            faculty: facultyId,
            timetable
        });
        const savedClass = await newClass.save();
        res.json(savedClass);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;