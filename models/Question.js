const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    option: { type: Array }
});
module.exports = questionSchema;
