const express =require('express');
const logger =require('morgan');

const authRouter=require('../routes/auth.routes')

const app = express();


app.use(express.json());
app.use(logger('dev')); 

app.use("/api/auth",authRouter)


module.exports = app;