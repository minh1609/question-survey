const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    //_id: false,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    questionSet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionSet"
    },
    highestScore: { type: Number, default: 0 },
    firstTimeScore: { type: Number }
});

// recordSchema.index({ user: 1 });
// recordSchema.index({ questionSet: 1 });

const Record = mongoose.model("Record", recordSchema);
module.export = Record;
