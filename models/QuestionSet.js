const mongoose = require("mongoose");

const Question = require("./Question");

const recordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    highestScore: { type: Number },
    firstTimeScore: { type: Number },
    _id: false //No auto generate Id
});

const questionSetSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "No Name" },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    description: { type: String, default: "No description" },
    answers: { type: Array },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    record: [recordSchema]
});
const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);
module.exports = QuestionSet;
