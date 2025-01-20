const schema = require("../model/adminSchema");
const fs = require("fs");
const path = require("path");

module.exports.login = (req , res) =>{
    res.render("login");
}

module.exports.userLogin = async (req , res) =>{
    let admin = await schema.findOne({email: req.body.email});
    if(admin){
        if(admin.password == req.body.password){
            // res.cookie("adminData" , admin);
            res.redirect("/dashboard");
        }else{
            res.render("/");
        }
    } else{
        res.redirect("/");
    }
};

module.exports.logout = (req , res) =>{
    req.session.destroy();
    // res.clearCookie("adminData");
    res.redirect("/");
};

module.exports.dashboard = async (req , res) =>{
     res.render("dashboard") 
    //  req.cookies.adminData ?
    //  : res.redirect("/");
}


module.exports.addadmin = async (req , res) =>{
     res.render("addadmin") 
    //  req.cookies.adminData ?
    //  : res.redirect("/");
}

module.exports.addadminData = async (req , res) =>{
    req.body.image = req.file.path;
    await schema.create(req.body)
    .then((data) =>{
        res.redirect("/addadmin");
    });
};

module.exports.viewadmin = async (req , res) =>{
//    if(req.cookies.adminData){
    await schema.find({})
    .then((data) =>{
        res.render("viewadmin" , {data});    
        // res.redirect("/");

    });
   }   




module.exports.deleteData = async (req , res) =>{
    await schema.findById(req.query.id)
    .then(singleData =>{
        if(singleData){
            fs.unlinkSync(singleData.image);
        }
        return schema.findByIdAndDelete(req.query.id);
    })
    .then(() =>{
        res.redirect("/viewadmin");
    })
    
    
};

module.exports.editData = async (req , res) =>{
    let data = await schema.findById(req.query.id);
    res.render("edit" , {data});
};

module.exports.updateData = async (req , res) =>{
    let img = "";
    let singleData = await schema.findById(req.body.id);
    req.file ? (img = req.file.path) : (img = singleData.image);
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;

    await schema.findByIdAndUpdate(req.body.id , req.body)
    .then((data) =>{
        res.redirect("/viewadmin");
    });
    
};


