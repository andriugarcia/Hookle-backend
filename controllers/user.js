'use strict'

// const User=require('../models/user')
const service=require('../services')

function signUp(req, res){
    const user=new User({
        username: req.body.username,
        password: req.body.password
    })
    return user.save((err, user)=>{
        console.log(user)
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el usuario'
            })
        }
        else {
            res.status(301).send({
                message: 'Usuario creado',
                token: service.createToken(user)
            })
        }
    })
}

let signIn = function(req, res){
    console.log(req.body)
    User.find({username: req.body.username}, (err, user)=>{
        console.log("USER", user[0])
        if(err) return res.status(500).send({message: err})
        if(!user[0]) {
            let sign = signUp(req, res)
        }
        
        else if (user[0].password == req.body.password) {
            req.user=user
            res.status(201).send({
                message:'Login correcto',
                token: service.createToken(user[0])
            })
        }
        else {
            res.status(401).send({
                message: 'La contraseña no es correcta'
            })
        }

    })
}

function getUser(req, res){

    User.find({username: req.params.username}, function (err, user) {
        console.log(user)
        if(err) return res.status(500).send({message: err})
        if(!user[0]) return res.status(402).send({message: "Usuario no encontrado"})

        console.log(req.headers.authorization.split(" ")[1])
        service.decodeToken(req.headers.authorization.split(" ")[1]).then(function (payload) {
            console.log(user[0]._id, payload)
            if(user[0]._id == payload) {
                res.status(202).send({
                    username: user[0].username,
                    bio: user[0].bio,
                    password: user[0].password
                })
            }
            else {
                res.status(202).send({
                    username: user[0].username,
                    bio: user[0].bio
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(405).send({message: "Token Invalido"})
        })

    })
}

function postUser(req, res){
    let user=new User()

    User.find({username: req.params.username}, function (err, user) {
        if(err) return res.status(500).send({message: err})
        if(!user[0]) return res.status(402).send({message: "Usuario no encontrado"})

        console.log(req.headers.authorization.split(" ")[1])
        service.decodeToken(req.headers.authorization.split(" ")[1]).then(function (payload) {
            console.log(user[0]._id, payload)
            if(user[0]._id == payload) {
               User.findOneAndUpdate({'username': user[0].username}, { username: user[0].username, bio: req.body.bio, password: req.body.password }, {}, () => {
                   res.status(203).send({
                       message: "OK"
                   })
               }).catch((err) => {
                   res.status(404).send({
                       message: `Error al modificar usuario ${err}`
                   })
               })

            }

            else {
                res.status(403).send({
                    message: "No estas autorizado para hacer esta modificación en este usuario"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(405).send({message: "Token Invalido"})
        })

    })
}

module.exports = {
    signIn,
    getUser,
    postUser
}