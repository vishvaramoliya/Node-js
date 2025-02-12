const subcatSchema = require("../model/subcategorySchema")
const productSchema = require("../model/proSchema")

module.exports.addProduct = async (req, res) => {
    await subcatSchema.find({}).then((data) => {
        res.render("addProduct", { data })
    })
}

module.exports.addproduct2 = async (req, res) => {
    req.body.image = req.files.image[0].path
    await productSchema.create(req.body).then(() => {
        res.redirect("/product/addProduct");
    })
}

module.exports.viewproduct = async (req, res) => {
    await productSchema.find({})
        .populate({
            path: "subcategoryId",
            populate: {
                path: "categoryId"
            }
        })
        .then((data) => {
            // console.log(data);
            
            res.render("viewproduct", { data })
        })
}
