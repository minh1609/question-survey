const mongoose = require("mongoose");

const Question = require("./Question");

const questionSetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    description: { type: String, default: "No description" },
    answers: { type: Array }
    //owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);
module.exports = QuestionSet;
