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

    app.get("/test/api", async (req, res) => {
        let ids = ["ab", "cd", "ef"];
        ids = ids.filter(value => {
            return value.localeCompare("ab") !== 0;
        });

        res.send(ids);
    });
};
