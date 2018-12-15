const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

router.post('/join/:id', (req, res) => {
    const course = req.params.id;
    console.log(req.body);
    Enrollment.create({_student: req.body.user, _course:course})
        .then(() => {    console.log(req.body);

            res.status(200).json({msg: "Alumno agregado con éxito"})
        })
        .catch(err => {
            res.status(500).json({err, msg: "No se pudo agregar"})
        })
});

router.patch('/confirm/:id',(req,res) => {
    const course = req.params.id;
    Enrollment.updateOne({"_id":req.body._id, "enrolledCourses._course": course},{$set: {"enrolledCourses.$.confirmed": true}})
        .then(() => {
            res.status(200).json({msg: "Alumno confirmado con éxito"})
        })
        .catch(err => {
            res.status(500).json({err, msg: "No se pudo confirmar"})
        })
});

router.delete('delete/:id',(req, res) => {
    Enrollment.findByIdAndRemove(req.params.id)
        .then(()=> {
            res.status(200).json({msg:"Inscripción eliminada"});
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;