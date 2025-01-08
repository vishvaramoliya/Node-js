const mongoose = require("mongoose");

const schema = mongoose.Schema({
    vote: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    genre: {
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