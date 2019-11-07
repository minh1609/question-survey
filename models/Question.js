const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    option: { type: Array, required: true },
    answer: { type: Number, required: true }
});
const Question = mongoose.model("questions", questionSchema);
module.exports = Question;
