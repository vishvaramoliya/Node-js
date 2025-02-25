const employeeSchema = require("../../model/Employee Schema/firstSchema");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const mailer = require("../../middleware/Admin/mailer")

module.exports.addEmployee = async (req,res)=>{
    let employee = await employeeSchema.findOne({email: req.body.email})

    if(employee){
        res.status(200).json({msg: "Employee already registered"})
    }
    else{
        req.body.password = await bcrypt.hash(req.body.password, 10);
    await employeeSchema.create(req.body)
    res.status(200).json({msg: "Employee registered"})
    }
}

module.exports.loginEmployee = async (req,res)=>{
    let employee = await employeeSchema.findOne({email: req.body.email})

    if(!employee){
        res.status(200).json({msg: "Employee not registered"})
    }

    if(await bcrypt.compare(req.body.password, employee.password)){
        let token = jwtToken.sign({employeeData: employee},"employee",{expiresIn: "1h"})

        res.status(200).json({msg: "Employee logged in", token: token})
    }else{
        res.status(200).json({msg: "password is wrong"})
    }
}

module.exports.deleteEmployee = async (req,res)=>{
    let employee = await employeeSchema.findOne({email: req.body.email})

    if(employee){
        await employeeSchema.findByIdAndDelete(employee.id)
        res.status(200).json({msg: "Employee deleted successfully"})
    }else{
        res.status(200).json({msg: "Employee not found"})
    }

}

module.exports.changePassword = async (req,res)=>{
    let employee = await employeeSchema.findOne({email: req.body.email});

    if(!employee){
        res.status(200).json({msg: "Employee not found"})
    }

    if(await bcrypt.compare(req.body.oldPass , employee.password)){
        if(req.body.oldPass != req.body.newPass){
            if(req.body.newPass == req.body.confirmPass){
                let newPass = await bcrypt.hash(req.body.newPass, 10)
                res.status(200).json({msg: "Password changed"})
                employee.password = newPass;
                await employee.save();
            }else{
                res.status(200).json({msg: "new password and confirm password are not same"})
            }
        }else{
            res.status(200).json({msg: "old password and new password are same"})
        }
    }else{
        res.status(200).json({msg: "Password not match"})
    }
}

module.exports.forgetPassword = async (req,res)=>{
    let employee = await employeeSchema.findOne({email: req.body.email})

    if(!employee){
        res.status(200).json({msg: "Employee not found"})
    }

    let otp = Math.floor(Math.random() * 1000 + 9000)
    mailer.sentOtp(req.body.email, otp)

    req.session.otp = otp;
    req.session.employeeData = employee;

    res.status(200).json({msg: "OTP sent successfully " + otp})
}

module.exports.recoverPasswordWithOTP = async (req,res)=>{
    let otp = req.session.otp;
    let employee = req.session.employeeData;

    if(req.body.otp == otp){
        if(await bcrypt.compare(req.body.newPass, employee.password)){
            
            res.status(200).json({msg: "Old password and new password are same"})
        }else{
            if(req.body.newPass == req.body.confirmPass){
                let password = await bcrypt.hash(req.body.newPass, 10)
                let employeeData = await employeeSchema.findByIdAndUpdate(employee._id, {password});
                res.status(200).json({ msg: "Password changed" })
            }else{
                res.status(200).json({msg: "New password and confirm password are not same"})
            }
        }
    }else{
        res.status(200).json({msg: "OTP is wrong"})
    }
}