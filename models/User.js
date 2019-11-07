const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: String
});
const User = mongoose.model("User", userSchema);

module.export = User;
