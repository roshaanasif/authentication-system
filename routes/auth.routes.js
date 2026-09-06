const express = require("express");
// const router = express.Router();

const authRouter=express.Router();
const authControllers=require('../controllers/auth.controllers')


authRouter.post('/register',authControllers.register);

authRouter.get('/get-me',authControllers.getMe);

authRouter.get('/refresh-token',authControllers.refreshToken);


module.exports=authRouter

