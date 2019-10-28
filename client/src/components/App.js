import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../style.css";

import QuestionSet from "./QuestionComponent/QuestionSet";
import Home from "./QuestionComponent/Home";
import CreateQuestionSet from "./QuestionComponent/CreateQuestionSet";

import Header from "./Header";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/questionset/:id"
                        component={QuestionSet}
                    />
                    <Route
                        exact
                        path="/create/questionset"
                        component={CreateQuestionSet}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
