const mongoose =require('mongoose');


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username required"],
        unique:[true,"username should be unique"]      
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:[true,"email should be unique"]      
    },
    password:{
        type:String,
        required:[true,"password required"],
    },
    verified:{
        type:Boolean,
        default:false
    }
})


const usermodel=mongoose.model("user",userSchema);

module.exports=usermodel;