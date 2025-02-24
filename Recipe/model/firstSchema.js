const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingred: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const firsSchema = mongoose.model("data", schema);
module.exports = firsSchema;