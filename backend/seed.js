const mongoose = require('mongoose');
const User = require('./models/User');
const StudentData = require('./models/StudentData');
const Class = require('./models/Class');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB for Seeding');

        // Clear existing data
        await User.deleteMany({});
        await StudentData.deleteMany({});
        await Class.deleteMany({});
        console.log('🗑️ Cleared existing data');

        // 1. Create Student User
        const studentUser = new User({
            username: 'ffpmhs1',
            password: 'ffphms123', // In production, hash this!
            role: 'student',
            fullName: 'Alex Doe'
        });
        await studentUser.save();
        console.log('👤 Created Student: ffpmhs1 / ffpmhs123');

        // 2. Create Student Data
        const studentData = new StudentData({
            user: studentUser._id,
            admissionNumber: 'STU001',
            grade: '10th Grade',
            section: 'A',
            fees: {
                total: 5000,
                paid: 3000,
                status: 'Pending'
            }
        });
        await studentData.save();
        console.log('📚 Created Student Academic Data');

        // 3. Create Faculty User
        const facultyUser = new User({
            username: 'teacher1',
            password: 'ffpmhs123',
            role: 'faculty',
            fullName: 'Mr. John Smith'
        });
        await facultyUser.save();
        console.log('👨‍🏫 Created Faculty: teacher1 / ffpmhs123');

        // 4. Create a Class for Faculty
        const mathClass = new Class({
            name: '10th Grade Mathematics',
            faculty: facultyUser._id,
            timetable: [{
                    day: 'Mon',
                    startTime: '08:00',
                    endTime: '09:00',
                    room: '101'
                },
                {
                    day: 'Wed',
                    startTime: '10:00',
                    endTime: '11:00',
                    room: '101'
                }
            ]
        });
        await mathClass.save();
        console.log('🏫 Created Math Class');

        console.log('✅ Seeding Complete!');
        process.exit(0);

    } catch (err) {
        console.error('❌ Seeding Error:', err);
        process.exit(1);
    }
};

seedDatabase();