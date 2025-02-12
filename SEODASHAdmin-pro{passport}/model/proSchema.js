const mongoose = require("mongoose");

const schema = mongoose.Schema({
    proname: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subcategory",
        required: true
    }
})

const adminSchema = mongoose.model("product", schema);

module.exports = adminSchema;