const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter =nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        user:config.GOOGLE_USER,
        clientId:config.GOOGLE_CLIENT_ID,
        clientSecret:config.GOOGLE_CLIENT_SECRET,
        refreshToken:config.GOOGLE_REFRESH_TOKEN
    }
})


transporter.verify((error,success)=>{
    if(error){
        console.log("error connecting to email server",error)
    }else{
        console.log("email server is ready for sending mails");
        
    }
})



const sendEmail=async(to,subject,text,html)=>{
    try{
        const info=transporter.sendMail({
            from:`roshaan <${config.GOOGLE_USER}>`,
            to,
            subject,
            text,
            html
        });
        console.log("Email sent successfully", info.messageId);
        console.log("preview url", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("Error sending email", error);
    }
}


module.exports=sendEmail

