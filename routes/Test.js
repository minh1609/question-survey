const express = require("express");

const QuestionSet = require("../models/QuestionSet");
const User = require("../models/User");

module.exports = (app = express()) => {
    app.get("/", (req, res) => {
        res.send("ok");
    });

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

    app.post("/test/api/question", async (req, res) => {
        let data = req.body;

        let newQuestionSet = new QuestionSet({
            name: "Newly Created Question",
            description: "Tgis question has no body"
        });

        newQuestionSet.save();
        res.send();
    });
};
