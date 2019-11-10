const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    questionSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questionsets"
    },
    highestScore: { type: Number, default: 0 },
    firstTimeScore: { type: Number }
});

recordSchema.index({ user: 1 });
recordSchema.index({ questionSet: 1 });

const Record = mongoose.model("records", recordSchema);
module.exports = Record;
