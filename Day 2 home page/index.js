const express = require("express")
const port = 1008

const app= express();

let students = [
    {"ID" : "1" , "Name" : "Piyu" , "Subject" : "React JS"},
    {"ID" : "2" , "Name" : "Vishwa" , "Subject" : "Node JS"},
    {"ID" : "3" , "Name" : "Ayush" , "Subject" : "Tailwind"},
    {"ID" : "4" , "Name" : "Rutul" , "Subject" : "Bootstrap"}
]
app.set("view engine" , "ejs");

app.get("/" , (req , res)=>{
    res.render("index" , {students});
})



app.listen(port , (err)=>{
    err ? console.log(err) : console.log("Server started on port " + port);
})