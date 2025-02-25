const managerSchema = require("../../model/Manager Schema/firstSchema");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const mailer = require("../../middleware/Admin/mailer")

module.exports.addManager = async (req, res) => {
    let manager = await managerSchema.findOne({ email: req.body.email });

    if (manager) {
        res.status(200).json({ msg: "Manager already exist" });
    } else {
        req.body.password = await bcrypt.hash(req.body.password, 10);

        await managerSchema.create(req.body);
        res.status(200).json({ msg: "Manager added successfully" });
    }
}

module.exports.loginManager = async (req, res) => {
    let manager = await managerSchema.findOne({ email: req.body.email })

    if (!manager) {
        res.status(200).json({ msg: "Manager not registered" })
    }

    if (await bcrypt.compare(req.body.password, manager.password)) {
        let token = jwtToken.sign({ managerData: manager }, "manager", { expiresIn: "1h" });

        res.status(200).json({ msg: "Manager logged in", token: token })
    } else {
        res.status(200).json({ msg: "Manager password is wrong" })
    }
}

module.exports.deleteManager = async (req, res) => {
    let manager = await managerSchema.findOne({ email: req.body.email })

    if (manager) {
        await managerSchema.findByIdAndDelete(manager.id);
        res.status(200).json({ msg: "Manager deleted successfully" })
    } else {
        res.status(200).json({ msg: "Manager not found" })
    }
}

module.exports.changePassword = async (req, res) => {
    let manager = await managerSchema.findOne({ email: req.body.email })

    if (!manager) {
        return res.status(200).json({ msg: "Manager not registered" })
    }

    if (await bcrypt.compare(req.body.oldPass, manager.password)) {
        if (req.body.oldPass != req.body.newPass) {
            if (req.body.newPass == req.body.confirmPass) {
                let newPass = await bcrypt.hash(req.body.newPass, 10)

                res.status(200).json({ msg: "Password changed" })

                manager.password = newPass;
                await manager.save();
            } else {
                res.status(200).json({ msg: "New password and confirm password are not same" })
            }
        } else {
            res.status(200).json({ msg: "New and old pass are same" })
        }

    } else {
        return res.status(200).json({ msg: "password are not same" })
    }
}


module.exports.forgetPass = async (req, res) => {
    let manager = await managerSchema.findOne({email: req.body.email})

    if(!manager){
       return res.status(200).json({msg: "Manager not found"})
    }

    let otp = Math.floor(Math.random() * 1000 + 9000);
    mailer.sentOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.managerData = manager;

    res.status(200).json({msg: "OTP sent successfully " + otp});
}

module.exports.recoverPasswithOTP = async (req,res)=>{
    let otp = req.session.otp;
    let manager = req.session.managerData;

    if(req.body.otp == otp){
        if(await bcrypt.compare(req.body.newPass, manager.password)){
            res.status(200).json({msg:"old password and new password are same"})
        }else{
            if(req.body.newPass == req.body.confirmPass){
                let newPass = await bcrypt.hash(req.body.newPass, 10)
                let managerData = await managerSchema.findByIdAndUpdate(manager._id, { password: newPass });
                res.status(200).json({msg: "password changed"})
            }else{
                res.status(200).json({msg: "new password and confirm password are different"})
            }
        }
    }else{
        res.status(200).json({msg: "OTP is wrong"})
    }
}