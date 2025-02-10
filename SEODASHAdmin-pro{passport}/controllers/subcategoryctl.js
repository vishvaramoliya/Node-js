const catSchema = require("../model/catSchema")
const subcatSchema = require("../model/subcategorySchema")

module.exports.addsubcat = async (req , res)=>{
    await catSchema.find({}).then((data)=>{
        res.render("addsubcat", {data})
    })
}

module.exports.viewsubcat = async (req , res)=>{
    await subcatSchema.find({})
    .populate("categoryId")
    .then((data)=>{
        res.render("viewsubcat" , {data})
    })
}

module.exports.addsubcategory = async(req , res)=>{
    req.body.image = req.file.path;
    await subcatSchema.create(req.body)
    .then(()=>{
        res.redirect("/subCategory/addsubcat");
    })
}
