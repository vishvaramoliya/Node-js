const schema = require("../../model/Admin Schema/firstSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../../middleware/Admin/mailer")

module.exports.register = async (req, res) => {

    let admin = await schema.findOne({ email: req.body.email })

    if (admin) {
        res.status(200).json({ msg: "Admin already exist please login" })
    } else {

        req.body.password = await bcrypt.hash(req.body.password, 10)

        await schema.create(req.body);
        res.status(200).json({ msg: "Admin Registered" });
    }
}

module.exports.login = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email })

    const adminData = {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        contact: admin.contact
    }

    if (!admin) {
        res.status(200).json({ msg: "Admin not registered" });
    }
    if (await bcrypt.compare(req.body.password, admin.password)) {
        let token = jwt.sign({ adminData: admin }, "kakadiya", { expiresIn: "1h" })

        res.status(200).json({ msg: "Admin logged in", token: token, admin: adminData })
    } else {
        res.status(200).json({ msg: "password is wrong" })
    }

}

module.exports.dashboard = async (req, res) => {
    await schema.find({})
        .then((data) => {
            res.status(200).json({ msg: "Admin get successfully" })
        })
}

module.exports.changePassAdmin = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email })

    if (await bcrypt.compare(req.body.oldPassword, admin.password)) {

        if (req.body.oldPassword != req.body.newPassword) {

            if (req.body.newPassword == req.body.confirmPassword) {
                let newPass = await bcrypt.hash(req.body.newPassword, 10)
                res.status(200).json({ msg: "password changed" });

                admin.password = newPass;
                await admin.save();
            } else {
                res.status(200).json({ msg: "new password and confirm Password are different" });
            }

        } else {
            res.status(200).json({ msg: "old password and new Password are same" });
        }


    } else {
        res.status(200).json({ msg: "old password is wrong" })
    }



}


module.exports.forgetPass = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email });
    console.log(admin);

    if (!admin) {
        res.status(200).json({ msg: "Admin not found" })
    }

    let otp = Math.floor(Math.random() * 1000 + 9000);
    mailer.sentOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.adminData = admin;

    res.status(200).json({ msg: "OTP send successfully " + otp })
}

module.exports.changePassWithOtp = async (req, res) => {
    let otp = req.session.otp;
    let admin = req.session.adminData;
  
    if (req.body.otp == otp) {
        if (await bcrypt.compare(req.body.newPass, admin.password)) {
            res.status(200).json({ msg: "Old password and new password are same" })
        } else {
            if (req.body.newPass == req.body.confirmPass) {
                let password = await bcrypt.hash(req.body.newPass, 10)
                let adminData = await schema.findByIdAndUpdate(admin._id, { password: password });
                res.status(200).json({ msg: "Password changed" })
            } else {
                res.status(200).json({ msg: "New password and confirm password not match" })
            }
        }
    } else {
        res.status(200).json({ msg: "OTP was wrong" })
    }
}