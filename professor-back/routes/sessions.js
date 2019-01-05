const express = require('express');
const router = express.Router();
const Session = require('../models/Session');


router.post('/new', (req, res) => {
    Session.create(req.body)
        .then((session)=> {
            res.status(200).json({msg: "Sesión creada con éxito",session})

        })
        .catch(err => {
            res.status(500).json({err, msg: "No se pudo crear"})
        })
});

router.get('/all/:id',(req, res) => {
    Session.find({"_course" : req.params.id})
        .populate("attendance._student")
        .then(sessions => {
            res.status(200).json({sessions});
        })
        .catch(err => {
            res.status(500).json({err, msg: "algo no sirve"})
        })
});

router.get('/day/:date', (req, res) => {
    Session.find({"date" : req.params.date})
        .populate('_course')
        .then(sessions => {
            res.status(200).json({sessions});
        })
        .catch(err => {
            res.status(500).json({err, msg: "algo no sirve"})
        })
});

router.get('/:id', (req, res) => {
    Session.findById(req.params.id)
        .then(session => {
            res.status(200).json({session});
        })
        .catch(err => {
            res.status(500).json({err, msg: "algo no sirve"})
        })
});

router.patch('/:id',(req, res) =>{
    Session.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .then(() => {
            res.status(200).json({msg: "Sesión modificada con éxito"});
        })
        .catch(err => {
            console.log(err);
        })
});

router.delete('/:id', (req, res) => {
    Session.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json({msg: "Sesión eliminada con éxito"});
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;