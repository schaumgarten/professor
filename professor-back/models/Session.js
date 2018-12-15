const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    _course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    date: Date,
    activities: Array,
    materials: Array,
    attendance: [{
        _student: Schema.Types.ObjectId,
        ref: 'User',
        attended: Boolean
    }]
});

module.exports = mongoose.model('Session',sessionSchema);