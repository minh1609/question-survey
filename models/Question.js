const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: Number, required: true, enum: [1, 2, 3, 4] },
    option: { type: Array }
});
module.exports = questionSchema;
