const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    _course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    date: Date,
    dateString: String,
    activities: Array,
    materials: Array,
    attendance: [{
        _id: false,
        _student: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        attended: Boolean
    }]
});

module.exports = mongoose.model('Session',sessionSchema);