const catSchema = require("../model/catSchema")
const fs = require("fs")


module.exports.addcat = (req, res)=>{
    res.render("addcat")
}

module.exports.addcategory = async(req , res)=>{
    req.body.image = req.files.image[0].path;
    console.log(req.body);
    
    await catSchema.create(req.body)
        res.redirect("/category/addcat")
    
}

module.exports.viewcat = async (req, res) => {
    await catSchema.find({})
        .then((data) => {
            res.render("viewcat", { data });
        });
}