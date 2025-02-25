const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/Authentication_with_react_+_jwt");

const db = mongoose.connection;

db.once("open", (err) =>{
    err ? console.log(err): console.log("mongodb connected");
})

module.exports = db;