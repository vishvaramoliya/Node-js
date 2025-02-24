const { match } = require("assert");
const  mongoose = require("mongoose");
const { type } = require("os");

const schema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    phone:{
        type:Number,
        required: true,
        // match: [/^(\+\d{1,3}[- ]?)?\d{10}$/]
    },
    email:{
        type:String,
        required: true,
        // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/]
    },
    password:{
        type:String,
        required: true,
        // match: [/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/]
    }
})

const adminSchema = mongoose.model("admin" , schema);

module.exports = adminSchema;