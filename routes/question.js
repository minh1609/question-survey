const express = require("express");

const QuestionList = require("../models/QuestionList");
const User = require("../models/User");

module.exports = (app = express()) => {
    //Get All question from server database
    app.get("/api/question", async (req, res) => {
        const data = await QuestionList.find({});
        res.status(200).send(data);
    });

    //Get specific question List
    app.get("/api/question/:id", async (req, res) => {
        const data = await QuestionList.findById(req.params.id);
        res.status(200).send(data);
    });

    //Add a new question list
    app.post("/api/question", async (req, res) => {
        let { name, owner, questions } = req.body;

        let newQuestionList = new QuestionList({
            name,
            owner,
            questions
        });

        await newQuestionList.save();
        res.status(201).send();
    });
};
