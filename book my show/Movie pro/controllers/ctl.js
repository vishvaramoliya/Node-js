const schema = require("../model/firstSchema");
const fs = require("fs");
const path = require("path")

module.exports.firstpage = async (req,res)=>{
    let data = await schema.find({})
    res.render("index",{data})
}
module.exports.singleMovie = async (req,res)=>{
    res.render("singleMovie")
}
module.exports.addMovie = async (req,res)=>{
    res.render("addMovie");
}

module.exports.addData = async (req , res)=>{
    req.body.image = req.file.path;
    await schema.create(req.body)
    .then((data) =>{
        res.redirect("/");
    })
};

module.exports.deleteData = async  (req, res) => {
    schema.findById(req.query.id)
        .then(singleData => {
            if (singleData) {
                fs.unlinkSync(singleData.image); 
            }
            return schema.findByIdAndDelete(req.query.id);
        })
        .then(() => {
            res.redirect("/");
        })
       
};

module.exports.editData =  async (req , res) =>{
    let data = await schema.findById(req.query.id);
    res.render("edit" , {data});
};

module.exports.updateData = async (req , res)  =>   {    
  let img = "";
  let singleData = await schema.findById(req.body.id);
  req.file ? (img = req.file.path) : (img = singleData.image);
  req.file && fs.unlinkSync(singleData.image);

  req.body.image = img;

  await schema.findByIdAndUpdate(req.body.id , req.body)
  .then((data) =>{
    res.redirect("/");
  })
   

};