const express = require("express");

const QuestionSet = require("../models/QuestionSet");
const User = require("../models/User");

module.exports = (app = express()) => {
    //Get All question from server database
    app.get("/api/question", async (req, res) => {
        const data = await QuestionSet.find({});
        res.status(200).send(data);
    });

    //Get specific question List
    app.get("/api/question/:id", async (req, res) => {
        try {
            const data = await QuestionSet.findById(req.params.id);
            res.status(200).send(data);
        } catch (error) {
            res.send(error);
        }
    });

    //Add a new question list
    app.post("/api/question", async (req, res) => {
        let { name, owner, questions } = req.body;

        let newQuestionSet = new QuestionSet({
            name,
            questions
        });

        try {
            await newQuestionList.save();
            res.status(201).send();
        } catch (error) {
            res.status(401).send();
        }
    });
};
