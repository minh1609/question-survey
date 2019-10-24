const mongoose = require("mongoose");

const questionSchema = require("./Question");

const questionListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: [questionSchema],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const QuestionList = mongoose.model("QuestionList", questionListSchema);
module.exports = QuestionList;
