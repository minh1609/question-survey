const mongoose = require("mongoose");

const questionSchema = require("./Question");

const questionSetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: [questionSchema],
    description: { type: String, default: "No description" },
    answers: { type: Array }
    //owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);
module.exports = QuestionSet;
