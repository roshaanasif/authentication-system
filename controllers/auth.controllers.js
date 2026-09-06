
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

const accessToken=jwt.sign(
{
    userid : user._id,
},
config.JWT_SECRET,
{
    expiresIn:"15m"
} 
)

const refreshToken=jwt.sign(
{
    userid : user._id,
},
config.JWT_SECRET,
{
    expiresIn:"7d"
} 
)

res.cookie("refreshToken",refreshToken,
    {
        httponly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    }
)

res.status(201).json({
    message:"user register successfully",
    user:{
        username:user.username,
        email:user.email,
    },
    accessToken

})






}

exports.getMe=async(req,res)=>{

    const token =req.headers.authorization?.split(" ")[1];

    if(!token){
        res.status(401).json({
            message:"token not found"
        })
    }

    const decoded=jwt.verify(token,config.JWT_SECRET);

    const user=await usermodel.findById(decoded.userid);

    res.status(200).json({
        message:"user fetched successfully",
        user:{
            username:user.username,
            email:user.email
            }
        })
}

exports.refreshToken=async(req,res)=>{

    const refreshToken=req.cookies.refreshToken;

    if(!refreshToken){
        res.status(401).json({
            message:"refreshToken is required"
        })
    }


    const decoded=jwt.verify(refreshToken,config.JWT_SECRET);

    const user=await usermodel.findById(decoded.userid);

    const newAccessToken=jwt.sign(
        {
            userid : user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn:"15m"
        } 
    )

    const newRefreshToken=jwt.sign(
        {
            userid : user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn:"7d"
        } 
    )

    res.cookie("refreshToken",newRefreshToken
        ,{
        httponly:true,
        secure:true,
        sameSite:true,
        expiresIn:7*24*60*60*1000
        }
    )

    res.status(200).json({
        message:"Access Token created Successfully",
        newAccessToken
    })
}