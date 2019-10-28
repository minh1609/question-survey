const express = require("express");

const QuestionSet = require("../models/QuestionSet");
const User = require("../models/User");
const Question = require("../models/Question");

module.exports = (app = express()) => {
    //Get All question from server database
    app.get("/api/questionset", async (req, res) => {
        const data = await QuestionSet.find({}).populate("questions");
        res.status(200).send(data);
    });

    //Get specific question set by id
    app.get("/api/questionset/:id", async (req, res) => {
        try {
            const data = await QuestionSet.findById(req.params.id).populate(
                "questions"
            );
            res.status(200).send(data);
        } catch (error) {
            res.send(error);
        }
    });

    //Add a new question set
    app.post("/api/questionset", async (req, res) => {
        let { name, description } = req.body;

        let newQuestionSet = new QuestionSet({
            name,
            description
        });

        try {
            let data = await newQuestionSet.save();
            res.status(201).send(data);
        } catch (error) {
            res.status(401).send();
        }
    });

    //Add a new question to questioon set
    app.post("/api/questionset/:setid", async (req, res) => {
        let { question, option, answer } = req.body;
        console.log(answer);
        option = option.split("||");

        let newQuestion = new Question({ question, option, answer });

        let questionSet = await QuestionSet.findById(req.params.setid);
        questionSet.questions.push(newQuestion);

        Promise.all([newQuestion.save(), questionSet.save()])
            .then(() => {
                res.status(201).send({ message: "New question added to set" });
            })
            .catch(err => {
                res.send(err);
            });
    });

    app.delete("api/question/:questionId", async (req, res) => {
        await Question.findByIdAndDelete(req.params.questionId);
    });
};
