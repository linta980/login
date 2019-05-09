const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const db = require('../db/connection')

// jEBENO ZNACI : juzers mi je baza (database) a users mi je tabela/kolekcija -- jebo joj ja mater
const users = db.get('users')
const teretana = db.get('teretana_useri')

const router = express.Router()


const schema = Joi.object().keys({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().required(),
    ime: Joi.string(),
    prezime: Joi.string(),
    adresa: Joi.string(),
    broj_telefona: Joi.string(),

})

const schema_teretana = Joi.object().keys({
        trener:Joi.string().required(),
        domaci:Joi.string().required(),
        vreme:Joi.date().required(),
        approved_by:Joi.string().required() 
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
                next(error, res.sendStatus(406));
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
    
    const result = Joi.validate(req.body, schema)
    if (result.error === null) {
        users.findOne({
            username: req.body.username
        }).then(user => {
            if(user){
                const password = bcrypt.compare(req.body.password, user.password).then(result => {
                    if (result) {
                        const payload = {
                            _id: user._id,
                            username: user.username
                        }
                        const token = jwt.sign(payload, process.env.TOKEN_SECCRET,{expiresIn : '1d'}, (err, token)=>{
                            if(err){
                                respondError422(res,next)
                            }
                            else{
                                res.json({token})
                                
                            }
                        })
                    }
                    else {
                        respondError422(res,next)
                    }
                });
            }
            else{
                respondError422(res,next)
            }
        })
    }
    else {
        respondError422(res,next)
    }

})




//-------------------MAIN PAGE-------------------
router.get('/main', (req, res) => {
    res.json({
        message:'E sve kul..',
        user: req.user
    })

})

//-------------------ABOUT PAge-------------
router.get ('/about', (req,res)=>{
    res.json({
        message:'Esi mi dobar About',
        user:req.user
    })
})

//--------Admin Page------
router.post('/admin' , (req,res,next)=>{
    const result = Joi.validate(req.body, schema_teretana)
    if(result.error===null){
        teretana.insert({
            trener:req.body.trener,
            domaci:req.body.domaci,
            vreme:req.body.vreme,
            approved_by: req.body.approved_by
        }).then(inserted_teretana => {
            res.json(inserted_teretana)
        })
    }else{
        respondError422(res,next)
    }
})


function respondError422(res,next){
    res.status(422)
    const error = new Error('Unable to login.')
    next(error)
}







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