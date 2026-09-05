
const usermodel=require('../models/users')
const crypto=require("crypto")
const jwt=require("jsonwebtoken")
const config=require('../config/config')

exports.register = async(req,res) => {
    
const {username,email,password}=req.body;

const IsAlreadyRistered=await usermodel.findOne({
    $or:[
        {email},
        {username}
    ]
})

if(IsAlreadyRistered){
    return res.status(409).json({
        message:"username or email must be unique"
    })
}

const hashedPassword=crypto.createHash('sha256').update(password).digest("hex")


const user=await usermodel.create({
    username,
    email,
    password:hashedPassword
})

const token=jwt.sign(
{
    userid : user._id,
},
config.JWT_SECRET,
{
    expiresIn:"1h"
} 
)

res.status(201).json({
    message:"user register successfully",
    user:{
        username:user.username,
        email:user.email,
    },
    token

})






}