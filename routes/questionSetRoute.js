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

    app.delete("/api/questionset/:setId", async (req, res) => {
        try {
            let data = await QuestionSet.findByIdAndDelete(req.params.setId);
            res.status(201).send(data);
        } catch (error) {
            res.send(error);
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

    // Remove a question where id = questionId from question set where id = set id
    app.delete("/api/questionset/:setId/:questionId", async (req, res) => {
        //remove a reference question Id from Question Set and remove question by Id
        let questionSet = await QuestionSet.findById(req.params.setId);
        let { questions } = questionSet;
        let newQuestions = [];

        for (let i = 0; i < questions.length; i++) {
            let strId = questions[i].toString();
            if (strId.localeCompare(req.params.questionId) !== 0) {
                newQuestions.push(questions[i]);
            }
        }

        questionSet.questions = newQuestions;

        Promise.all([
            Question.findByIdAndDelete(req.params.questionId),
            questionSet.save()
        ])
            .then(result => {
                res.status(201).send(result);
            })
            .catch(err => {
                res.status(400).send();
            });
        res.send();
    });
};
