const monk = require('monk')
const connString = 'localhost/juzers'

const db = monk(connString)

module.exports=db