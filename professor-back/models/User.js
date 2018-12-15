const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['professor','student','admin'],
        default: 'student'
    },
    profilePic: String,


    enrolledCourses: [{
        _id: false,
        _course: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        confirmed: {
            type:Boolean,
            default: false
        },
        gradesAvg: Number,
        attendance: Number
    }]
});

module.exports= mongoose.model('User',userSchema);