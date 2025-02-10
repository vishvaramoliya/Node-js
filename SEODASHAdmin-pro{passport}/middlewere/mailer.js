const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    service : "gmail",
    auth: {
        user : "vishvaramoliya98@gmail.com",
        pass : "gkslfkhbijlpgbzu"
    }
})

module.exports.sendOtp = (to , otp)=>{
    let mailOptions={
        from : "vishvaramoliya98@gmail.com",
        to : to,
        subject : "password reset",
        text : `your otp is ${otp}`
    }

    transport.sendMail(mailOptions , (err)=>{
        err ? console.log(err) : console.log("otp send on your email");    
        
    })
}                   