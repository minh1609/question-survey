const mongoose = require("mongoose");

const userRecordSchema = new mongoose.Schema({
    _id: false,
    set: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionSet" },
    highestScore: { type: Number },
    firstTimeScore: { type: Number }
});

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: String,
    userRecords: [userRecordSchema]
});
const User = mongoose.model("User", userSchema);

module.exports = User;
