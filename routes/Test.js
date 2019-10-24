const express = require("express");

const QuestionList = require("../models/QuestionList");
const User = require("../models/User");

module.exports = (app = express()) => {
    app.get("/", (req, res) => {
        res.send("ok");
    });

    app.get("/question", async (req, res) => {
        const data = await Question.find();
        res.send(data);
    });

    app.post("/question", async (req, res) => {
        const user = new QuestionList({ dog: 1234 });
        await user.save();

        res.send(user);
    });
};
