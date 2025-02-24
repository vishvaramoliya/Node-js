const mongoose = require("mongoose");

const schema = mongoose.Schema({
    catname: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
})

const adminSchema = mongoose.model("category", schema);

module.exports = adminSchema;