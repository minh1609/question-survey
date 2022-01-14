const express = require("express");

const QuestionSet = require("../models/QuestionSet");
const Question = require("../models/Question");
const User = require("../models/User");

module.exports = (app = express()) => {
    //Get All question from server database
    app.get("/test/api/question", async (req, res) => {
        const data = await QuestionSet.find();
        res.send(data);
    });

    //Get specific question List
    app.get("/test/api/question/:id", async (req, res) => {
        const data = await QuestionSet.findById(req.params.id);
        res.send(data);
    });

    app.get("/test/api/:setid", async (req, res) => {
        let data1 = await QuestionSet.findById(req.params.setid);

        res.send(data1);
    });
};
