const catSchema = require("../model/catSchema")
const subcatSchema = require("../model/subcategorySchema")

module.exports.addsubcat = async (req , res)=>{
    await catSchema.find({}).then((data)=>{
        res.render("addsubcat", {data})
    })
}

module.exports.addsubcategory = async(req , res)=>{
    req.body.image = req.files.image[0].path;
    await subcatSchema.create(req.body)
    .then(()=>{
        // console.log(req.files.subcatImage);
        
        res.redirect("/subCategory/addsubcat");
    })
}

module.exports.viewsubcat = async (req , res)=>{
    await subcatSchema.find({})
    .populate("categoryId")
    .then((data)=>{
        // console.log(data);
        
        res.render("viewsubcat" , {data})
    })
}


