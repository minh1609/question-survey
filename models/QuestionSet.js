const mongoose = require("mongoose");

const questionSetSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "No Name" },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "questions" }],
    description: { type: String, default: "No description" },
    answers: { type: Array },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
});

questionSetSchema.index({ owner: 1 });
const QuestionSet = mongoose.model("questionsets", questionSetSchema);
module.exports = QuestionSet;
