const jwt = require('jsonwebtoken');


function checkTokenSetUser(req, res, next) {
    debugger
    const authorization = req.get('token')
    if (authorization) {
        console.log(authorization)
        jwt.verify(authorization , process.env.TOKEN_SECCRET ,(err, user)=>{
            if(err){
                console.log('kurcina....')
            }
            req.user=user;
            console.log('do jaja!!')
            next()
        })
        
    } else {
        next()
    }

}

module.exports = { checkTokenSetUser }
