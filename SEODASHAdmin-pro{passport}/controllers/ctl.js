const schema = require("../model/adminSchema");
const fs = require("fs");
const path = require("path");
// const flash = require("connect-flash")
let mailer = require("../middlewere/mailer")

module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.userLogin = async (req, res) => {
    req.flash("success" , "login successfully!")
    res.redirect("/dashboard");
};

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};

module.exports.dashboard = async (req, res) => {
    res.render("dashboard")
}




module.exports.addadmin = async (req, res) => {
    res.render("addadmin")
}

module.exports.addadminData = async (req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body)
        .then((data) => {
            res.redirect("/addadmin");
        });
};

module.exports.viewadmin = async (req, res) => {
    await schema.find({})
        .then((data) => {
            res.render("viewadmin", { data });

        });
}

module.exports.profile = (req, res) => {
    res.render("profile")
}
module.exports.changepass = (req, res) => {
    res.render("changepass")
}

module.exports.changepassword = async (req, res) => {
    // console.log(req.body);

    let user = await req.user
    // console.log(user);
    
    if(user.password = req.body.oldpass){
        if(req.body.oldpass != req.body.newpass){
            if(req.body.newpass == req.body.confirmpass){
                 let admin = await schema.findByIdAndUpdate(user.id , {password : req.body.newpass})
                admin && res.redirect("/logout")

            }
            else{
                res.redirect("changepass")
            }
        }
        else{
            res.redirect("changepass")        
        }    
    }
    else{
        res.redirect("changepass")        
    }
    
}


module.exports.deleteData = async (req, res) => {
    await schema.findById(req.query.id)
        .then(singleData => {
            if (singleData) {
                fs.unlinkSync(singleData.image);
            }
            return schema.findByIdAndDelete(req.query.id);
        })
        .then(() => {
            res.redirect("/viewadmin");
        })


};

module.exports.editData = async (req, res) => {
    let data = await schema.findById(req.query.id);
    res.render("edit", { data });
};

module.exports.updateData = async (req, res) => {
    let img = "";
    let singleData = await schema.findById(req.body.id);
    req.file ? (img = req.file.path) : (img = singleData.image);
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;

    await schema.findByIdAndUpdate(req.body.id, req.body)
        .then((data) => {
            res.redirect("/viewadmin");
        });

};


module.exports.lostpass = async (req, res) => {
    res.render("lostpass")
}

module.exports.recoverpass = async (req, res) => {
    // console.log(req.body);

    let admin = await schema.findOne({
        email: req.body.email
    })

    if(!admin){
        return res.redirect("/")
    }

    let otp = Math.floor(Math.random() * 100000 + 90000);
    mailer = mailer.sendOtp(req.body.email , otp)
    
    req.session.otp = otp;
    req.session.addadminData = admin
    res.render("verifypass")
   
}

module.exports.verifypass =async (req , res)=>{
    console.log(req.body);

    let otp = req.session.otp;
    let admin = req.session.addadminData;
    
    if(req.body.otp == otp){
        if(req.body.newpass == req.body.confirmpass){
            let admindata = await schema.findByIdAndUpdate(admin._id , {
                password: req.body.newpass,
            })
            admindata &&res.redirect("/logout")
        }else{
            res.render("verifypass")
        }
    }
    
}


module.exports.category = (req , res)=>{
    res.render("category")
}