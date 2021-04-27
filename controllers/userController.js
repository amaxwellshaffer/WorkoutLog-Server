const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/test', (req, res) =>{
    res.send('test whatever');
});

router.post('/register', (req, res) => {
    User.create({
        username: req.body.username,
        passwordhash: bcrypt.hashSync(req.body.password, 10)
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'});
        res.status(200).send({
            message:`user successfully created. welcome, ${user.username}`,
            token
        });
    })
    .catch(error => res.status(500).send({
        message:'user not created',
        error: error.errors[0].message
    }))
});

router.post('/login', (req, res) => {
    User.findOne(
        {where: {
            username: req.body.username
        }
    })

    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.passwordhash, function(err, matches) {
                matches ? generateToken(user) : res.send('Password is Incorrect')
            })

            function generateToken(user) {
                let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'});
                res.send({message:`Welcome back, ${user.username}`, token})
            }
        } else {
            res.send('No User Found')
        }
    })
})

module.exports = router;