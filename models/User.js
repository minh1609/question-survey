const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: String,
    email: { type: String }
});
const User = mongoose.model("users", userSchema);

module.exports = User;
