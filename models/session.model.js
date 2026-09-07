const mongoose=require("mongoose");


const sessionSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user is required"]
    },
    refreshTokenHash:{
        type:String,
        required:[true,"refresh Token Hash is required"]
    },
    userAgent:{
        type:String,
        required:[true,"userAgent is required"]
    },
    IP:{
        type:String,
        required:[true,"IP is required"]
    },
    revoke:{
        type:Boolean,
        default:false
    }
},{
    timestamp:true
})


const sessionModel=mongoose.model("sessions",sessionSchema)

module.exports=sessionModel 