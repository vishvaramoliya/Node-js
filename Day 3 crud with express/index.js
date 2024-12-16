const express = require("express");
const port = 1008;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let students = [];

app.get("/", (req, res) => {
    res.render("index", { students });
});

app.post("/addData", (req, res) => {
    req.body.id = String(students.length + 1);
    students.push(req.body);
    res.redirect("/");
});

app.get("/deleteData", (req, res) => {
    let deletedata = students.filter((e) => e.id !== req.query.id);
    students = deletedata;
    res.redirect("/");
});

app.get("/editData/:id", (req, res) => {
    let singleData = students.find((el) => el.id == req.params.id)

    res.render("edit", { singleData })
});

app.post("/updateData", (req, res) => {
    students.map((e, i) => {
        if (e.id == req.body.id) {
            e.id = req.body.id,
                e.name = req.body.name,
                e.subject = req.body.subject
        }
        else {
            e
        }
    });
    res.redirect("/");
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server started on port :" + port);
});
