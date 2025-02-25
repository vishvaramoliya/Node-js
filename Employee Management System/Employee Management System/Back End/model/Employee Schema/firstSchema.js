const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["Admin", "Manager", "Employee"],
         required : true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

})

const firstSchema =  mongoose.model("Employee_Data", schema);

module.exports = firstSchema;