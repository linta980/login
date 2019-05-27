const express= require('express')
const morgan = require('morgan')
const cors = require('cors')
const body_parser = require('body-parser')
const port = process.env.PORT || 5000
const middleware = require('./auth/middlewares')

const kobas = require('./auth/index')

const cron = require('node-cron')



const db = require('./db/connection')


const app = express();


app.use(cors())
app.use(morgan('tiny'))


app.listen(port , ()=>{
    console.log(`Osluskujem port ${port}....`);
    
})



const auth = require('./auth/index')

//Znaci svaku rutu koju hocu da koristim imace ovaj /auth prefix ..npr /auth/register

//da bi opsluzivao slike koristim static u expresu 
app.use(express.static('public/uploads'))
app.use(express.static('images'))

app.use(express.json())
app.use(middleware.checkTokenSetUser)

//-----Cron Job da mi na svakih minut skida slie sa nekog sajta i pumpa bazu , trenutno sam ga 
//onemogucio da me ne smara , ima dosta slika .. a front end ce i daljeda se refresuje na svakih 60 sekundi da vidi da li ima nesto u bazi

// cron.schedule('* * * * *', ()=>{
//     console.log('Bravo momci')
//     kobas.fetchData()
//     console.log('Karina..')
// })

app.use('/auth',auth.router)
app.use('/auth/login',auth.router)
app.use('/auth/main',auth.router)
app.use('/auth/about',auth.router)
app.use('/auth/admin',auth.router)
app.use('/auth/teretana',auth.router)
app.use('/auth/upload',auth.router)
app.use('/auth/register',auth.router)
app.use('/auth/test',auth.router)






function notFound(req,res,next){
    res.send(404)
    const error = new Error('Not Found' +req.originalUrl);
    next(error)
}
function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500)
    res.json({
        message:err.message,
        stack:err.stack
    })
}

app.use(notFound);
app.use(errorHandler)




// app.post('/register', (req,res)=>{
//     const telo = req.body;
//     const userData = db.get('juzers_data')

//     userData.insert(telo).then(responese =>{
//         res.json(responese)
//         res.send(200)
//     }).catch(error =>{
//         res.send(500)
//     })


// })

// app.get('/register', (req,res)=>{
//     const users = db.get('juzers_data')
//     users.find({}).then(response => {
//         res.send(response)
//     }).catch()
// })

// app.post('/login', (req,res)=>{
//     const email = req.body.username
//     const pass = req.body.password

//     const users = db.get('juzers_data')
//     users.findOne({
//         "username":email,
//         "password":pass
//     }).then(response =>{
//         if(response !=null){
//             res.send(200)
//         }
//         else{
//             res.send(304)
//         }
//     }).catch()
// })


