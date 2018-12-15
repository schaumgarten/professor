const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
   _student:{
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
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
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);