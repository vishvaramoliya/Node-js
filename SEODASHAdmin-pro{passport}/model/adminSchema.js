const  mongoose = require("mongoose");
    
const schema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    gender:{
        type:String,
        required: true,
        // enum:['male' , 'female' , 'other']
       
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
    },
    image:{
        type:String,
        required: true
    }
})

const adminSchema = mongoose.model("data" , schema);

module.exports = adminSchema;