const express= require('express')
const morgan = require('morgan')
const cors = require('cors')
const body_parser = require('body-parser')
const port = process.env.PORT || 5000

const db = require('./db/connection')

const app = express();

app.use(cors())
app.use(morgan('tiny'))
app.use(body_parser.json())

app.listen(port , ()=>{
    console.log(`Osluskujem port ${port}....`);
    
})
app.post('/register', (req,res)=>{
    const telo = req.body;
    const userData = db.get('juzers_data')

    userData.insert(telo).then(responese =>{
        res.json(responese)
        res.send(200)
    }).catch(error =>{
        res.send(500)
    })


})

app.get('/register', (req,res)=>{
    const users = db.get('juzers_data')
    users.find({}).then(response => {
        res.send(response)
    }).catch()
})

app.post('/login', (req,res)=>{
    const email = req.body.username
    const pass = req.body.password

    const users = db.get('juzers_data')
    users.findOne({
        "username":email,
        "password":pass
    }).then(response =>{
        if(response !=null){
            res.send(200)
        }
        else{
            res.send(304)
        }
    }).catch()
})


