const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    author : { 
        type : String,
        required : true,
    },
    price : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
});

const firsSchema = mongoose.model("Student" , schema);
module.exports = firsSchema;