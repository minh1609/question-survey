const express = require("express");
const mongoose = require("mongoose");

const QuestionSet = require("../models/QuestionSet");
const User = require("../models/User");
const Question = require("../models/Question");

const requireLogIn = require("../middlewares/requireLogin");

module.exports = (app = express()) => {
    //Get  question set from server database
    app.get("/api/questionset", async (req, res) => {
        let query = QuestionSet.find({});

        if (req.query.name) {
            //text search on more than 1 field
            query = QuestionSet.find({
                $text: { $search: `/${req.query.name}/i` },
            });
        }
        try {
            const data = await query.populate("owner", "email");
            res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    //Get specific question set set by id
    app.get("/api/questionset/:setId", async (req, res) => {
        try {
            const data = await QuestionSet.findById(req.params.setId)
                .populate("questions")
                .populate("owner", "email");
            res.status(200).send(data);
        } catch (error) {
            res.send(error);
        }
    });

    app.patch("/api/questionset/:setId", async (req, res) => {
        try {
            let result = await QuestionSet.findByIdAndUpdate(req.params.setId, {
                $set: req.body,
            });
            res.status(201).send(result);
        } catch (error) {
            res.send(error);
        }
    });

    //Add a new question set
    app.post("/api/questionset", requireLogIn, async (req, res) => {
        let { name, description, topic } = req.body;

        let newQuestionSet = new QuestionSet({
            name,
            description,
            owner: req.user.id,
            topic,
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
            let questionSet = await QuestionSet.findById(req.params.setId);

            let questions = questionSet.questions;

            for (let questionID of questions) {
                await Question.findByIdAndDelete(questionID);
            }

            let deleteQuery = await QuestionSet.findByIdAndDelete(
                req.params.setId
            );

            res.status(201).send(deleteQuery);
        } catch (error) {
            res.send(error);
        }
    });

    //Add a new question to questioon set
    //TODO: Change to transaction
    app.post("/api/questionset/:setId", async (req, res) => {
        let { question, option, answer } = req.body;
        console.log(answer);
        option = option.split("||");

        let newQuestion = new Question({ question, option, answer });

        let questionSet = await QuestionSet.findById(req.params.setId);
        questionSet.questions.push(newQuestion);

        Promise.all([newQuestion.save(), questionSet.save()])
            .then(() => {
                res.status(201).send({ message: "New question added to set" });
            })
            .catch((err) => {
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

        //Transaction: 2 Query must be success
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const opts = { session };
            const query1 = await Question.findByIdAndDelete(
                req.params.questionId,
                opts
            );

            const query2 = await questionSet.save(opts);

            await session.commitTransaction();
            res.status(201).send({ message: "Success" });
            session.endSession();
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            res.status(400).send(error);
        }
    });
};
