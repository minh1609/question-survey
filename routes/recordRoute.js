const express = require("express");
const mongoose = require("mongoose");

const QuestionSet = require("../models/QuestionSet");
const User = require("../models/User");
const Question = require("../models/Question");
const Record = require("../models/Record");

module.exports = (app = express()) => {
    app.post("/api/record", async (req, res) => {
        let userId = "5dc0ba1576614225fc6f4503";

        let { score, setId } = req.body;

        try {
            // let newRecord = new Record({
            //     user: mongoose.Types.ObjectId(userId),
            //     questionSet: mongoose.Types.ObjectId(setId)
            // });

            let newRecord = new Record({
                user: mongoose.Types.ObjectId(userId),
                questionSet: mongoose.Types.ObjectId(setId)
            });

            let result = await newRecord.save();
            res.send(result);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });

    //

    app.get("/api/user/record", async (req, res) => {
        try {
            let result = await Record.find({ user: req.user.id });
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
