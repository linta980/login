const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const db = require('../db/connection')

// jEBENO ZNACI : juzers mi je baza (database) a users mi je tabela/kolekcija -- jebo joj ja mater
const users = db.get('users')

const router = express.Router()


const schema = Joi.object().keys({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().required(),
    ime: Joi.string().required(),
    prezime: Joi.string().required(),
    adresa: Joi.string().required(),
    broj_telefona: Joi.string().required(),

})



// ------------------REGISTER-------------------------

router.get('/register', (req, res) => {
    const users = db.get('users')
    users.find({}).then(users => {
        res.json(users)
    })

})

router.post('/register', (req, res, next) => {
    const result = Joi.validate(req.body, schema)
    if (result.error === null) {
        users.findOne({
            username: req.body.username
        }).then(user => {
            if (user) {
                const error = new Error('User with this username is already taken');
                next(error);
            }
            else {
                const pass = bcrypt.hash(req.body.password, 8).then(hashPassword => {

                    users.insert({
                        ime: req.body.ime,
                        prezime: req.body.prezime,
                        adresa: req.body.adresa,
                        broj_telefona: req.body.broj_telefona,
                        username: req.body.username,
                        password: hashPassword
                    }).then(inserted_user => {
                        res.json(inserted_user)
                    })
                })

            }
        })

    } else {
        next(result.error)
    }
})


// ----------------------------LOGIN--------------------------

router.post('/login', (req, res, next) => {
        users.findOne({
            username:req.body.username
        }).then(user =>{
            if(user){
                res.send(200)
            }else{
                res.send(304)
                const error = new Error('Username does not exist in database')
                next(error)
            }
        }).catch()
})






// router.post('/signup', (req, res, next) => {
//     const result = Joi.validate(req.body, schema)
//     if (result.error === null) {
//         users.findOne({
//             username: req.body.username
//         }).then(user => {
//             if (user) {
//                 const error = new Error('Username already exists')
//                 next(error)
//             }
//             else {
//                 bcrypt.hash(req.body.password, 12).then(hashPassword => {

//                     const newUser = {
//                         username: req.body.username,
//                         password: hashPassword
//                     }
//                     users.insert(newUser).then(inserted_user => {
//                         res.json(inserted_user)
//                     })
//                 })

//             }
//         })
//     }
//     else {
//         next(result.error)
//     }
// })

module.exports = router