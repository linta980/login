const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fs = require('fs')
const fetch = require('node-fetch')

const fileUpload = require('express-fileupload')

const multer = require('multer')




//Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage
})


const db = require('../db/connection')

// jEBENO ZNACI : juzers mi je baza (database) a users mi je tabela/kolekcija -- jebo joj ja mater
const users = db.get('users')
const teretana = db.get('teretana_useri')
const test = db.get('test')

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
    trener: Joi.string().required(),
    domaci: Joi.string().required(),
    vreme: Joi.date().required(),
    approved_by: Joi.string().required()
})

const schema_file = Joi.object().keys({
    file_name: Joi.string().valid(['image/jpeg/png']).required()
})


//--------------TEST------------------//
router.get("/test", (req, res) => {
    test.find({}).then(result => {
        res.json(result)
    })
})
function fetchData() {
    console.log('Pocinje..')
    const date = new Date().getTime()
    fetch('https://picsum.photos/200?random').
        then(res => {
            const dest = fs.createWriteStream('./images/' + date + '.png')
            res.body.pipe(dest)
            test.insert({
                ime_slike: date + '.png',
                file_path: date + '.png'
            }).then(inserted_picture => res.json({
                message: 'SLika je uneta u bazu'
            }))
        })
}



// ------------------REGISTER-------------------------

router.get('/register', (req, res) => {
    const users = db.get('users')
    users.find({}).then(users => {
        res.json(users)
    })

})
router.get('/register/:id', (req, res, next) => {
    users.findOne({ '_id': req.params.id }).then(result => {
        if (result) {
            res.json(result)
        } else {
            respondError422(res, next)
        }

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
            if (user) {
                const password = bcrypt.compare(req.body.password, user.password).then(result => {
                    if (result) {
                        const payload = {
                            _id: user._id,
                            username: user.username,
                            file_path: user.file_path,
                            name: user.name

                        }
                        const token = jwt.sign(payload, process.env.TOKEN_SECCRET, { expiresIn: '1d' }, (err, token) => {
                            if (err) {
                                respondError422(res, next)
                            }
                            else {
                                res.json({ token, user_id: payload._id })

                            }
                        })
                    }
                    else {
                        respondError422(res, next)
                    }
                });
            }
            else {
                respondError422(res, next)
            }
        })
    }
    else {
        respondError422(res, next)
    }

})


//-------------------MAIN PAGE-------------------
router.get('/main', (req, res) => {

    res.json({
        message: 'E sve kul..',
        user: req.user
    })

})

//-------------------ABOUT PAge-------------
router.get('/about', (req, res) => {
    res.json({
        message: 'Esi mi dobar About',
        user: req.user
    })
})

//--------Admin Page------
router.post('/admin', (req, res, next) => {
    const result = Joi.validate(req.body, schema_teretana)
    if (result.error === null) {

        users.update(
            { username: req.body.trener },
            {
                $push: {
                    domaci: {
                        trener: req.body.trener,
                        program: req.body.domaci,
                        vreme: req.body.vreme,
                        approved_by: req.body.approved_by
                    }
                }
            }
        ).then(response => {
            if (response) {
                res.json({
                    file: req.file,
                    message: 'Document uploaded'
                })
            }
            else {
                respondError422(res, next())
            }
        }).then(inserted_teretana => {
            res.json(inserted_teretana)
        })
        // teretana.insert({
        //     trener: req.body.trener,
        //     domaci: req.body.domaci,
        //     vreme: req.body.vreme,
        //     approved_by: req.body.approved_by
        // })

    } else {
        respondError422(res, next)
    }
})
//--------------------------TERETANA-----------------------

router.get('/teretana', (req, res, next) => {
    teretana.find({}).then(result => {
        if (result) {
            res.json(result)
        } else {
            respondError422(res, next)
        }
    })
})

router.get('/teretana/:ime', (req, res, next) => {
    teretana.find({ 'trener': req.params.ime })
        .then(users => res.json(users))

})


//--------------------POST a FIle----------------//
router.post('/upload', upload.single("file"), (req, res, next) => {

    if (req.body.token != null) {
        if (req.body.username != null) {
            users.update(
                { username: req.body.username },
                { $set: { 'file_path': req.file.path } },
                false,
                true

            ).then(response => {
                if (response) {
                    res.json({
                        file: req.file,
                        message: 'Document uploaded'
                    })
                }
                else {
                    respondError422(res, next())
                }
            })

        } else {
            respondError422(res, next())
        }
    } else {
        respondError422(res, next())
    }

    // console.log(req.body.username)
    // res.json({file: req.file,token:req.body.token})
})


function respondError422(res, next) {
    res.status(422)
    const error = new Error('Unable to login.')
    next(error)
}


module.exports = { router: router, fetchData: fetchData }

