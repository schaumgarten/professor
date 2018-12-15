const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evaluationSchema = new Schema ({
    //referenciar
    _course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    _session: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    },
    evaluationType: String,
    _student: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    evidence: String,
    grade: Number,
    comments: Array
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

module.exports = mongoose.model('Evaluation',evaluationSchema);