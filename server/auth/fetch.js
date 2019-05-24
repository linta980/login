const fetch = require('node-fetch')
const fs = require("fs")


const fetchingData = ()=>{
    const date = new Date().getTime()
    fetch('https://picsum.photos/200?random')
    .then(res => {
        const dest = fs.createWriteStream('./images/'+date+'.png');
        res.body.pipe(dest);
    }).then(resp => console.log(resp));
    
    

    
}

module.exports=fetchingData