const express =require('express');
const logger =require('morgan');
const cookie=require("cookie-parser");
const authRouter=require('../routes/auth.routes')

const app = express();

app.use((req, res, next) => {
    console.log("REQUEST RECEIVED:", req.method, req.url);
    next();
});

app.use(express.json());
app.use(logger('dev')); 
app.use(cookie()); 

app.use("/api/auth",authRouter);


module.exports = app;