const mongoose = require("mongoose");

const questionSchema = require("./Question");

const questionListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: [questionSchema],
    description: { type: String, default: "No description" },
    answers: { type: Array }
    //owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const QuestionList = mongoose.model("QuestionList", questionListSchema);
module.exports = QuestionList;
