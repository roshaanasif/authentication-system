

const mongoose=require('mongoose')

const config=require('../config/config')

async function connect() {
    await mongoose.connect(config.MONGO_DB_URI)
    .then(()=>{
        console.log(
            "DB connected sucessfully"
        );
    }).catch((err)=>{
        console.log(`connection FAILED Due to ${err}`)
    })
}


module.exports = connect;