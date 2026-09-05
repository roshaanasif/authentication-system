const app =require('./src/app')
const connect=require("./config/db")
const config=require('./config/config')


connect()

app.listen(config.PORT,()=>{
    console.log(`server running on port ${config.PORT}`);
})