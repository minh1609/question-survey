require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

require("./services/passport");

const app = express();
mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Middleware config
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

//Define Route
require("./routes/Test")(app);
require("./routes/questionSetRoute")(app);
require("./routes/questionRoute")(app);
require("./routes/authRoutes")(app);
require("./routes/recordRoute")(app);
require("./routes/adminRoute")(app);

//PRODUCTION SET UP
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "ci") {
    //If route do not match express round, try to match it with React Router
    app.use(express.static("client/build"));
    const path = require("path");

    //If route is not defined, send back HTML file
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});
