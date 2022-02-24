const express = require("express");

const QuestionSet = require("../models/QuestionSet");
const User = require("../models/User");
const Question = require("../models/Question");

let isAdmin = (user) => {
    if (user) {
    }
};

module.exports = (app = express()) => {
    app.get("/api/admin", async (req, res) => {
        res.send(req.user);
    });
};
