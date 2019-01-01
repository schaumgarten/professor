const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    _professor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    evaluationCriteria: Array
});

module.exports = mongoose.model('Course',courseSchema);