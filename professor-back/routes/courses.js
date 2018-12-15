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

            /*User.findByIdAndUpdate(user._id,{$set: {role: "professor"}})
                .then((user) => {
                    console.log(user)
                })*/
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

router.get('/course/:id', (req, res) => {
    Enrollment.find({"_course" : req.params.id})
        .populate('_student')
        .then(enrollments => {
            console.log(enrollments);
            res.status(200).json({enrollments});
            /*const queryArray = enrollments.filter(one =>{
                return one._student;*/
            //})

        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
        //.populate('enrolledCourses._course')
        .then(user => {
            //console.log(user);
            if (user.role === "professor") {
                Course.find({"_professor": req.params.id})
                    .then(courses => {
                        res.status(200).json({courses});
                    })
                } else {
                Enrollment.find({"_student":req.params.id})
                    //.populate('_course')
                    .populate({path: '_course', populate: { path: '_professor'}})
                    .then(courses => {
                        res.status(200).json({courses})
                    });

                /*const queryArray = [];

                user.enrolledCourses.map(course => {
                   queryArray.push(course._course)
                });
                console.log(queryArray)
                Course.find({"_id": { $in: queryArray}})
                    .then(courses => {

                        res.status(200).json({courses});
                    });*/
            }
        })
})





//¡ARREGLAR!



module.exports = router;