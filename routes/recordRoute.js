const express = require("express");
const mongoose = require("mongoose");

const QuestionSet = require("../models/QuestionSet");
const User = require("../models/User");
const Question = require("../models/Question");
const Record = require("../models/Record");

module.exports = (app = express()) => {
    app.post("/api/record", async (req, res) => {
        let userId = req.user.id;

        let { score, setId } = req.body;

        try {
            let record = await Record.findOne({
                user: userId,
                questionSet: mongoose.Types.ObjectId(setId)
            });

            if (!record) {
                let newRecord = new Record({
                    user: userId,
                    questionSet: mongoose.Types.ObjectId(setId),
                    firstTimeScore: score,
                    highestScore: score
                });

                let result = await newRecord.save();
                res.status(201).send(result);
            } else {
                if (record.highestScore < score) {
                    record.highestScore = score;
                    let result = await record.save();
                    res.status(201).send(result);
                } else {
                    res.status(201).send();
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    });

    app.get("/api/user/record", async (req, res) => {
        try {
            let result = await Record.find({ user: req.user.id }).populate(
                "questionSet",
                "name"
            );

            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.get("/api/set/record/:setId", async (req, res) => {
        try {
            let result = await Record.find({ questionSet: req.params.setId });
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    });
};
