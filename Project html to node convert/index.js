const express = require("express");
const path = require("path");
const port = 1009;
const app = express()

app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/",(req,res)=>{
    res.render("index")
})
app.listen(port , (err)=>{
    err ? console.log(err) : console.log("server started on port : " + port)
})