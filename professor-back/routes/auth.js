const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register',(req, res) => {

    if(req.body.password !== req.body.confirmPassword) return res.status(500).json({msg: "Las cotraseñas no coinciden"});
    const salt = bcrypt.genSaltSync(256);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const {name,email,role} = req.body;

    User.create({name,email,password:hashedPassword})
        .then(()=> {
            res.status(201).json({msg: "Usuario creado con éxito"})

        })
        .catch(err => {
            res.status(500).json({err, msg: "No se pudo crear"})
        })
});

router.post('/login', async(req,res)=> {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(404).json({msg: "Email no es válido"});
    let validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return;
    const token = jwt.sign(
        {id: user._id},
        process.env.SECRET,
        {expiresIn: 8600}
    );
      //desaparece el password de user
    delete user._doc.password;
    res.status(200).json({user,token});
});

router.get('/', (req,res) => {
    User.find()
        .then(users => {
            res.status(200).json({users})
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.status(200).json({user})
        })
        .catch(err => {
            console.log(err);
        })
});

router.patch('/:id',(req, res) =>{
    User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .then(() => {
            res.status(200).json({msg: "Usuario modificado con éxito"});
        })
        .catch(err => {
            console.log(err);
        })
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json({msg: "Usuario eliminado con éxito"});
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;