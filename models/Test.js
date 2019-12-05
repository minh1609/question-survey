const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questionSet: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "questionset"
    },
    duration: { type: Number },
    start: { type: Date, required: true },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: "user" }
});

const Record = mongoose.model("test", testSchema);
module.exports = Record;
