import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../style.css";
import "../extraStyle.css";

import QuestionSet from "./QuestionComponent/QuestionSet";
import Home from "./QuestionComponent/Home";
import CreateQuestionSet from "./QuestionComponent/CreateQuestionSet";
import EditQuestion from "components/QuestionComponent/EditQuestion";
import LogIn from "components/PageComponent/LoginPage";

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
                    <Route
                        exact
                        path="/edit/question/:id"
                        component={EditQuestion}
                    />
                    <Route exact path="/login" component={LogIn} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
