const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');


router.post('/new',(req, res) => {

    const {title, user} = req.body;
    Course.create({title, _professor: user._id})
        .then(() => {
            res.status(201).json({msg: "Curso creado con éxito"});
        })
        .catch(err => {
            res.status(500).json({err, msg: "No se pudo crear"})
        })
});

router.get('/', (req, res) => {
   Course.find()
       .populate('_professor')
       .then(courses => {
            res.status(200).json({courses})
       })
        .catch(err => {
            res.status(500).json({err, msg:"algo no sirve"})
        })
});

router.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .populate('_professor')
        .then(course => {
            res.status(200).json({course});
        })
        .catch(err => {
            res.status(500).json({err, msg: "algo no sirve"})
        })
});

router.get('/course/:id', (req, res) => {
    Enrollment.find({"_course" : req.params.id})
        .populate('_student')
        .then(enrollments => {
            console.log(enrollments);
            res.status(200).json({enrollments});
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user.role === "professor") {
                Course.find({"_professor": req.params.id})
                    .then(courses => {
                        res.status(200).json({courses});
                    })
                } else {
                Enrollment.find({"_student":req.params.id})
                    .populate({path: '_course', populate: { path: '_professor'}})
                    .then(courses => {
                        res.status(200).json({courses})
                    });
            }
        })
});

router.patch('/:id',(req, res) =>{
    Course.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .then(() => {
            res.status(200).json({msg: "Curso modificado con éxito"});
        })
        .catch(err => {
            console.log(err);
        })
});

router.delete('/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json({msg: "Curso eliminado con éxito"});
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;