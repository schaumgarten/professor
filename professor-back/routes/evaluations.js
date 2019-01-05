const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation');


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
        .populate("_session")
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
    Evaluation.find({"evaluationType": req.params.id})
        .populate('_student')
        .then(eval => {
            res.status(200).json({eval});
        })
        .catch(err => {
            res.status(500).json({err, msg: "algo no sirve"})
        })
});

router.get('/sessions/:id',(req, res) => {
    Evaluation.find({"_session": req.params.id})
        .then(eval => {
            res.status(200).json({eval});
        })
        .catch(err => {
            res.status(500).json({err, msg: "algo no sirve"})
        })
});

router.patch('/:id',(req, res) =>{
  Evaluation.findByIdAndUpdate(req.params.id,req.body,{new:true})
      .then(() => {
          res.status(200).json({msg: "Evaluación modificada con éxito"});
      })
      .catch(err => {
          console.log(err);
      })
});

router.delete('/:id', (req, res) => {
    Evaluation.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json({msg: "Evaluación eliminada con éxito"});
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;