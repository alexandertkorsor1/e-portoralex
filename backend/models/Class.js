const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // e.g., "10A Mathematics"
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentData'
    }],
    timetable: [{
        day: {
            type: String,
            enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        startTime: String,
        endTime: String,
        room: String
    }],
    materials: [{
        title: String,
        fileUrl: String,
        type: {
            type: String,
            enum: ['note', 'assignment'],
            default: 'note'
        },
        deadline: Date, // Only for assignments
        submissions: [{
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            fileUrl: String,
            submittedAt: {
                type: Date,
                default: Date.now
            }
        }],
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('Class', ClassSchema);