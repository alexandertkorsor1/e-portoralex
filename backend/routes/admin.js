const express = require('express');
const router = express.Router();
const User = require('../models/User');
const StudentData = require('../models/StudentData');
const Class = require('../models/Class');

/* ════════════════════════════════════════════════════
   ADMIN — USER MANAGEMENT (Students + Faculty)
   ════════════════════════════════════════════════════ */

// GET /api/admin/users — get all users (with optional ?role= filter)
router.get('/users', async (req, res) => {
    try {
        const filter = req.query.role ? {
            role: req.query.role
        } : {};
        const users = await User.find(filter).select('-password').sort({
            createdAt: -1
        });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// GET /api/admin/users/:id — get single user
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({
            msg: 'User not found'
        });

        // If student, also fetch academic data
        let academic = null;
        if (user.role === 'student') {
            academic = await StudentData.findOne({
                user: user._id
            });
        }

        res.json({
            user,
            academic
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// POST /api/admin/users — create a new user
router.post('/users', async (req, res) => {
    const {
        username,
        password,
        role,
        fullName
    } = req.body;

    try {
        let existing = await User.findOne({
            username
        });
        if (existing) return res.status(400).json({
            msg: 'Username already exists'
        });

        const user = new User({
            username,
            password: password || '1234', // TODO: hash with bcrypt
            role: role || 'student',
            fullName: fullName || username,
        });
        await user.save();

        // Auto-create student data if role is student
        if (role === 'student') {
            const studentData = new StudentData({
                user: user._id,
                grade: req.body.grade || '9',
                section: req.body.section || 'A',
                fees: {
                    total: 0,
                    paid: 0,
                    due: 0,
                    history: []
                },
                attendance: {
                    present: 0,
                    absent: 0,
                    late: 0,
                    history: []
                },
                marks: [],
            });
            await studentData.save();
        }

        res.status(201).json({
            msg: 'User created successfully',
            user: {
                ...user.toObject(),
                password: undefined
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// PUT /api/admin/users/:id — update a user
router.put('/users/:id', async (req, res) => {
    try {
        const updates = {
            ...req.body
        };
        delete updates.password; // Don't update password here

        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true
        }).select('-password');
        if (!user) return res.status(404).json({
            msg: 'User not found'
        });

        res.json({
            msg: 'User updated',
            user
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// DELETE /api/admin/users/:id — delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({
            msg: 'User not found'
        });

        // Also delete student data if exists
        await StudentData.deleteMany({
            user: user._id
        });
        await User.findByIdAndDelete(req.params.id);

        res.json({
            msg: 'User deleted successfully'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


/* ════════════════════════════════════════════════════
   ADMIN — CLASS MANAGEMENT
   ════════════════════════════════════════════════════ */

// GET /api/admin/classes
router.get('/classes', async (req, res) => {
    try {
        const classes = await Class.find().populate('faculty', 'fullName username').sort({
            name: 1
        });
        res.json(classes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// GET /api/admin/classes/:id
router.get('/classes/:id', async (req, res) => {
    try {
        const cls = await Class.findById(req.params.id)
            .populate('faculty', 'fullName username')
            .populate('students', 'fullName username');
        if (!cls) return res.status(404).json({
            msg: 'Class not found'
        });
        res.json(cls);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// POST /api/admin/classes — create a new class
router.post('/classes', async (req, res) => {
    try {
        const newClass = new Class({
            name: req.body.name,
            faculty: req.body.facultyId || null,
            timetable: req.body.timetable || [],
            students: [],
            materials: [],
        });
        const saved = await newClass.save();
        res.status(201).json({
            msg: 'Class created',
            class: saved
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// PUT /api/admin/classes/:id
router.put('/classes/:id', async (req, res) => {
    try {
        const cls = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!cls) return res.status(404).json({
            msg: 'Class not found'
        });
        res.json({
            msg: 'Class updated',
            class: cls
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// DELETE /api/admin/classes/:id
router.delete('/classes/:id', async (req, res) => {
    try {
        const cls = await Class.findByIdAndDelete(req.params.id);
        if (!cls) return res.status(404).json({
            msg: 'Class not found'
        });
        res.json({
            msg: 'Class deleted'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


/* ════════════════════════════════════════════════════
   ADMIN — FEES MANAGEMENT
   ════════════════════════════════════════════════════ */

// GET /api/admin/fees — get all student fee records
router.get('/fees', async (req, res) => {
    try {
        const studentData = await StudentData.find()
            .populate('user', 'fullName username role')
            .select('user grade section fees');
        res.json(studentData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// GET /api/admin/fees/:studentId
router.get('/fees/:studentId', async (req, res) => {
    try {
        const data = await StudentData.findOne({
                user: req.params.studentId
            })
            .populate('user', 'fullName username');
        if (!data) return res.status(404).json({
            msg: 'Student data not found'
        });
        res.json(data.fees);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// POST /api/admin/fees/payment — record a payment
router.post('/fees/payment', async (req, res) => {
    const {
        studentId,
        amount,
        method
    } = req.body;
    try {
        const data = await StudentData.findOne({
            user: studentId
        });
        if (!data) return res.status(404).json({
            msg: 'Student not found'
        });

        data.fees.paid = (data.fees.paid || 0) + amount;
        data.fees.due = (data.fees.total || 0) - data.fees.paid;
        data.fees.history.push({
            amount,
            method: method || 'Cash',
            date: new Date(),
        });
        await data.save();

        res.json({
            msg: 'Payment recorded',
            fees: data.fees
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


/* ════════════════════════════════════════════════════
   ADMIN — TIMETABLE
   ════════════════════════════════════════════════════ */

// GET /api/admin/timetable — all timetables
router.get('/timetable', async (req, res) => {
    try {
        const classes = await Class.find().populate('faculty', 'fullName').select('name timetable faculty');
        res.json(classes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// PUT /api/admin/timetable/:classId — update timetable for a class
router.put('/timetable/:classId', async (req, res) => {
    try {
        const cls = await Class.findByIdAndUpdate(
            req.params.classId, {
                timetable: req.body.timetable
            }, {
                new: true
            }
        );
        if (!cls) return res.status(404).json({
            msg: 'Class not found'
        });
        res.json({
            msg: 'Timetable updated',
            timetable: cls.timetable
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


/* ════════════════════════════════════════════════════
   ADMIN — ATTENDANCE OVERVIEW
   ════════════════════════════════════════════════════ */

router.get('/attendance/overview', async (req, res) => {
    try {
        const students = await StudentData.find().select('attendance grade');
        const totalPresent = students.reduce((s, st) => s + (st.attendance ? .present || 0), 0);
        const totalAbsent = students.reduce((s, st) => s + (st.attendance ? .absent || 0), 0);
        const totalLate = students.reduce((s, st) => s + (st.attendance ? .late || 0), 0);
        const totalDays = totalPresent + totalAbsent + totalLate;

        res.json({
            totalStudents: students.length,
            totalPresent,
            totalAbsent,
            totalLate,
            attendanceRate: totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});


/* ════════════════════════════════════════════════════
   ADMIN — REPORTS (summary endpoints)
   ════════════════════════════════════════════════════ */

router.get('/reports/students', async (req, res) => {
    try {
        const students = await StudentData.find().populate('user', 'fullName username');
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

router.get('/reports/financial', async (req, res) => {
    try {
        const data = await StudentData.find().select('fees grade');
        const totalExpected = data.reduce((s, d) => s + (d.fees ? .total || 0), 0);
        const totalCollected = data.reduce((s, d) => s + (d.fees ? .paid || 0), 0);
        res.json({
            totalExpected,
            totalCollected,
            totalPending: totalExpected - totalCollected,
            studentCount: data.length
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

// Dashboard stats
router.get('/dashboard/stats', async (req, res) => {
    try {
        const studentCount = await User.countDocuments({
            role: 'student'
        });
        const facultyCount = await User.countDocuments({
            role: 'faculty'
        });
        const classCount = await Class.countDocuments();
        const students = await StudentData.find().select('fees attendance');

        const totalFees = students.reduce((s, d) => s + (d.fees ? .paid || 0), 0);
        const totalPresent = students.reduce((s, d) => s + (d.attendance ? .present || 0), 0);
        const totalDays = students.reduce((s, d) => s + (d.attendance ? .present || 0) + (d.attendance ? .absent || 0) + (d.attendance ? .late || 0), 0);

        res.json({
            studentCount,
            facultyCount,
            classCount,
            totalFeesCollected: totalFees,
            attendanceRate: totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Server Error'
        });
    }
});

module.exports = router;