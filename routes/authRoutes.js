const passport = require("passport");
const QuestionSet = require("../models/QuestionSet");
const mongoose = require("mongoose");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    }),
    (req, res) => {}
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/user/test", async (req, res) => {
    let userId = req.user.id;
    try {
      let result = await QuestionSet.find(
        {
          owner: userId
        },
        "name description"
      );
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });
};
