const express = require("express");
// const router = express.Router();

const authRouter=express.Router();
const authControllers=require('../controllers/auth.controllers')


authRouter.post('/login',authControllers.login);

authRouter.post('/register',authControllers.register);

authRouter.get('/get-me',authControllers.getMe);

authRouter.get('/refresh-token',authControllers.refreshToken);

authRouter.get('/logout',authControllers.logOut);

authRouter.get('/logout-all',authControllers.logOutAll);

authRouter.get('/verify-email',authControllers.verifyEmail);

module.exports=authRouter

