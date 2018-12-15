const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation');
const Course = require('../models/Course')

router.post('/new', (req, res) => {
    Evaluation.create(req.body)
        .then(()=> {
            res.status(200).json({msg: "Evaluado con éxito"})

        })
        .catch(err => {
            res.status(500).json({err, msg: "No se pudo crear"})
        })
});

router.get('/student/:id',(req, res) => {
    Evaluation.find({"_student": req.params.id})
        .then(eval => {
            eval.forEach(eval => {
                console.log(eval.evaluationType, eval.grade);
            });
            res.status(200).json({eval});
        })
        .catch(err => {
            res.status(500).json({err, msg: "algo no sirve"})
        })
});

router.get('/course/:id', (req, res) => {
    Evaluation.find({"_course": req.params.id})
        .then(eval => {
            res.status(200).json({eval});
        })
        .catch(err => {
            res.status(500).json({err, msg: "algo no sirve"})
        })
});

module.exports = router;