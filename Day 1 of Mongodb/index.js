const express = require("express")
const db = require("./config/db")
const path = require("path")
const app = express()
const port = 2006;
const schema = require("./model/firstSchema");

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const multer = require("multer")

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + " " + Date.now())
    }
})

const upload = multer({ storage: Storage }).single("image")



app.get("/", async (req, res) => {
    let data = await schema.find({})
    res.render("index", { data })
})

app.post("/addData", upload, async (req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body)
    .then((data) => {
        res.redirect("/");
    })
});

app.get("/deleteData", async (req, res) => {
    await schema.findByIdAndDelete(req.query.id).then((data) => {
        res.redirect("/");
    });
});

app.get("/editData", async (req, res) => {
    let data = await schema.findById(req.query.id);
    res.render("edit", { data });
});

app.post("/updateData", async (req, res) => {
    await schema.findByIdAndUpdate(req.body.id, req.body)
        .then((data) => {
            res.redirect("/");
        });

});


app.listen(port, (err) => {
    err ? console.log(err) : console.log("server : " + port);
})