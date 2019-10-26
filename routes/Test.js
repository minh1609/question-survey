const express = require("express");

const QuestionList = require("../models/QuestionList");
const User = require("../models/User");

module.exports = (app = express()) => {
    app.get("/", (req, res) => {
        res.send("ok");
    });

    //Get All question from server database
    app.get("/test/api/question", async (req, res) => {
        const data = await Question.find();
        res.send(data);
    });

    //Get specific question List
    app.get("/test/api/question/:id", async (req, res) => {
        const data = await QuestionList.findById(req.params.id);
        res.send(data);
    });

    app.post("/test/api/question", async (req, res) => {
        let data = req.body;

        let newQuestionList = new QuestionList({
            name: "Sample Question",
            owner: "5db024590e319436dcf32c74",
            description: "Cartool Animal",
            questions: [
                {
                    question: "What animal is Tom",
                    option: ["dog", "cat", "cow", "pig"]
                },
                {
                    question: "What animal is Jerry",
                    option: ["dog", "cat", "mouse", "pig"]
                },
                {
                    question: "What animal is Donald",
                    option: ["duck", "cat", "mouse", "pig"]
                }
            ],
            answers: [1, 2, 0] //ANSWER FOR QUESTION 0 IS CAT
        });

        newQuestionList.save();
        res.send();
    });
};
