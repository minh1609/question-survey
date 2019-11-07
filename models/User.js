const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: String
});
const User = mongoose.model("users", userSchema);

module.exports = User;
