const mongoose=require("mongoose");


const otpSchema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"user",
        required:[true,"user is required"]
    },
    otpHash:{
        type:String,
        required:[true,"otpHash is required"]
    }
},

{timestamp:true}

)

const otpModel=mongoose.model("otpSchema",otpSchema);


module.exports=otpModel;