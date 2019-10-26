const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    option: { type: Array, required: true }
});
module.exports = questionSchema;
