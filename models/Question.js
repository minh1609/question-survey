const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String
    // option: [{}]
});
module.exports = questionSchema;
