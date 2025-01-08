const express = require("express");
const port = 2005;

const app = express();
const db = require("./confige/db");
const path = require("path");


app.use(express.urlencoded());
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads",express.static(path.join(__dirname ,'uploads')));
app.use("/" , require("./routes/route"));


app.listen(port,(err) =>{
    err ? console.log(err) : console.log("server started on port " + port);
})