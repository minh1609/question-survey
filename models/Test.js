const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questionSet: { type: mongoose.Types.ObjectId, required: true },
    duration: { type: Number },
    start: { type: Date, required: true }
});

const Record = mongoose.model("test", testSchema);
module.exports = Record;
