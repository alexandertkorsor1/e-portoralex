const mongoose = require('mongoose');

const StudentDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    admissionNumber: {
        type: String,
        required: true,
        unique: true
    },
    grade: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    fees: {
        total: {
            type: Number,
            default: 0
        },
        paid: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 'LRD'
        },
        status: {
            type: String,
            enum: ['Paid', 'Pending', 'Overdue'],
            default: 'Pending'
        }
    },
    attendance: [{
        date: Date,
        status: {
            type: String,
            enum: ['Present', 'Absent', 'Late'],
            default: 'Present'
        }
    }],
    marks: [{
        subject: String,
        examType: String,
        score: Number,
        total: Number
    }]
});

module.exports = mongoose.model('StudentData', StudentDataSchema);