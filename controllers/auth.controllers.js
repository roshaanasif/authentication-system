
const usermodel=require('../models/users')
const crypto=require("crypto")
const jwt=require("jsonwebtoken")
const config=require('../config/config')
const sessionModel = require('../models/session.model')



exports.login = async(req,res) => {
    const{email,password}=req.body;

    const user=await usermodel.findOne({email});

    if (!user){
        return res.status(401).json({
            message:"invalid email or password"
        })
    }

    const hashPassword=crypto.createHash('sha256').update(password).digest('hex');

    const isValidPassword=hashPassword===user.password;

    if(!isValidPassword){
         return res.status(401).json({
            message:"invalid  password"
        })
    }

const refreshToken=jwt.sign({
       userid : user._id
    },
    config.JWT_SECRET,
    {
        expiresIn:"7d"
    }

)

const refreshTokenHash=crypto.createHash("sha256").update(refreshToken).digest("hex")

const session=await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    IP:req.ip,
    userAgent:req.headers["user-agent"]
}
)


const accessToken=jwt.sign(
    {
        userid : user._id,
        sessionId:session._id
    },
    config.JWT_SECRET,
    {
        expiresIn:"15m"
    } 
)


res.cookie("refreshToken",refreshToken,
    {
        httponly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    }
)

res.status(200).json({
    message:"user login successfully",
    user:{
        username:user.username,
        email:user.email,
    },
    accessToken
})



}

exports.register = async(req,res) => {
    console.log("1. Register controller started");
const {username,email,password}=req.body;
  console.log("2. Body received:", username, email);
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
  console.log("3. findOne completed");
const hashedPassword=crypto.createHash('sha256').update(password).digest("hex")

console.log("4. Password hashed");

const user=await usermodel.create({
    username,
    email,
    password:hashedPassword
})

  console.log("5. User created:", user._id);


const refreshToken=jwt.sign(
{
    userid : user._id,
},
config.JWT_SECRET,
{
    expiresIn:"7d"
} 
)

  console.log("6. Refresh token created");

const refreshTokenHash=crypto.createHash("sha256").update(refreshToken).digest("hex")

const session=await sessionModel.create({
    user: user._id,
    refreshTokenHash,
    IP:req.ip,
    userAgent:req.headers["user-agent"]
}
)
  console.log("7. Session created:", session._id);

const accessToken=jwt.sign(
    {
        userid : user._id,
        sessionId:session._id
    },
    config.JWT_SECRET,
    {
        expiresIn:"15m"
    } 
)
  console.log("8. Access token created");

res.cookie("refreshToken",refreshToken,
    {
        httponly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    }
)
  console.log("9. Sending response");
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

exports.logOut=async(req,res)=>{

    const refreshToken =req.cookies.refreshToken

    if(!refreshToken){
       return res.status(400).json({
            message:"refresh Token not found"
        })
    }

    const refreshTokenHash=crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session=await sessionModel.findOne({
        refreshTokenHash,
        revoke:false
    })

    if(!session){
         return res.status(401).json({
            message:"invalid refresh token not found"
        })
    }

    session.revoke=true

    await session.save()

    res.clearCookie("refreshToken")

    res.status(200).json({
        message:"logout successfully"
    })

   

}

exports.logOutAll=async(req,res)=>{
    
    const refreshToken=req.cookies.refreshToken

     if(!refreshToken){
       return res.status(400).json({
            message:"refresh Token not found"
        })
    }

     const refreshTokenHash=crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session=await sessionModel.updateMany({
        refreshTokenHash,
        revoke:false
    }, {
        revoke:true
    })

    if(!session){
         return res.status(401).json({
            message:"invalid refresh token not found"
        })
    }

    res.clearCookie("refreshToken")

    res.status(200).json({
        message:"logout all successfully"
    })
}

exports.refreshToken=async(req,res)=>{

    const refreshToken=req.cookies.refreshToken;

    if(!refreshToken){
        res.status(400).json({
            message:"refreshToken is required"
        })
    }


    const decoded=jwt.verify(refreshToken,config.JWT_SECRET);

    const user=await usermodel.findById(decoded.userid);

    const refreshTokenHash=crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session=await sessionModel.findOne({
        refreshTokenHash,
        revoke:false
    })

    if(!session){
         return res.status(401).json({
            message:"invalid refresh token not found"
        })
    }

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

  const newRefreshTokenHash=crypto.createHash("sha256").update(newRefreshToken).digest("hex")

  session.refreshTokenHash=newRefreshTokenHash

  await session.save()
    res.cookie("refreshToken",newRefreshToken
        ,{
        httponly:true,
        secure:false,
        sameSite:true,
        expiresIn:7*24*60*60*1000
        }
    )

    res.status(200).json({
        message:"Access Token created Successfully",
        newAccessToken
    })
}