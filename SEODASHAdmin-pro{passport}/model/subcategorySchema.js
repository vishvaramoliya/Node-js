const mongoose = require("mongoose");

const schema = mongoose.Schema({
    subcatname: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category",
        required: true
    }
})

const adminSchema = mongoose.model("subcategory", schema);

module.exports = adminSchema;