const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "rutulkakadiya973@gmail.com",
        pass: "qdiznlziidlltezt"
    }
})

module.exports.sentOtp = (to, otp)=>{
    let mailOptions ={
        from: "rutulkakadiya973@gmail.com",
        to: to,
        subject: "Password reset OTP",
        text: `Your password reset OTP is ${otp}`
    }
    
    transport.sendMail(mailOptions, (err)=>{
        err ? console.log(err): console.log("OTP send successfully.");
    })
}
