const express = require("express");
var mongoose = require("mongoose");

const QuestionSet = require("../models/QuestionSet");
const User = require("../models/User");
const Question = require("../models/Question");
const Record = require("../models/Record");

var dayjs = require("dayjs");

let isAdmin = (user) => {
    if (user.role === "admin") {
        return true;
    } else {
        return false;
    }
};

//return the most frequent element in arr by field
let mostFreqElementInArr = (arr = [], field = "") => {
    let maxCount = 1;
    let res = arr[0][field];
    let curCount = 1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i][field].toString() === arr[i - 1][field].toString()) {
            curCount++;
        } else {
            if (curCount > maxCount) {
                maxCount = curCount;
                res = arr[i - 1][field];
            }
            curCount = 1;
        }
    }

    if (curCount > maxCount) {
        maxCount = curCount;
        res = arr[i - 1][field];
    }
    return { id: res, maxCount };
};

module.exports = (app = express()) => {
    app.get("/api/report", async (req, res) => {
        if (!isAdmin(req.user)) res.send("Please log in as admin");

        let serverRespond = {};

        serverRespond["Last update at"] = dayjs();
        serverRespond["Total User"] = await User.countDocuments();
        serverRespond["Total Quiz"] = await QuestionSet.countDocuments();
        serverRespond["Total Question"] = await Question.countDocuments();

        let recordReport = await Record.aggregate([
            {
                $group: {
                    _id: null,
                    averageFirstTimeScore: { $avg: "$firstTimeScore" },
                    averageHighestScore: { $avg: "$highestScore" },
                },
            },
        ]);

        serverRespond["Average first time score by all user"] =
            recordReport[0].averageFirstTimeScore;
        serverRespond["Average highest score by all user"] =
            recordReport[0].averageHighestScore;

        //find user take most quiz
        let recordSortByUser = await Record.find().sort("user");
        let mostActiveMem = mostFreqElementInArr(recordSortByUser, "user");
        let mostActiveMemDetail = await User.findById(mostActiveMem.id);
        serverRespond[
            "User take most quiz"
        ] = `${mostActiveMemDetail.name} ${mostActiveMemDetail.email} took ${mostActiveMem.maxCount} quizzes in total `;

        //find most famous quizz
        let recordSortByQuiz = await Record.find().sort("questionSet");
        let mostFamousQuiz = mostFreqElementInArr(
            recordSortByQuiz,
            "questionSet"
        );
        let mostFamousQuizDetail = await QuestionSet.findById(
            mostFamousQuiz.id
        );
        serverRespond[
            "Most famous quiz"
        ] = `${mostFamousQuizDetail.name} (id: ${mostFamousQuiz.id}) is taken by ${mostFamousQuiz.maxCount} users`;

        res.send(serverRespond);
    });
};
