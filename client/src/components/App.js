import React from "react";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import "../style.css";
import "../extraStyle.css";

import QuestionSet from "./QuestionComponent/QuestionSet";
import Home from "./QuestionComponent/Home";
import CreateQuestionSet from "./QuestionComponent/CreateQuestionSet";
import EditQuestion from "components/QuestionComponent/EditQuestion";
import LogIn from "components/PageComponent/LoginPage";
import UserRecord from "components/RecordComponent/UserRecord";
import About from "components/PageComponent/About";
import TestRecord from "components/RecordComponent/TestRecord";
import EditQuestionSet from "components/QuestionComponent/EditQuestionSet";
import Header from "./Header";
import Test from "components/TestComponent";
import Admin from "components/PageComponent/Admin";

import TransitionWrapper from "components/TransitionWrapper";

const App = () => {
    return (
        <BrowserRouter>
            <Header />

            <div className="container">
                <TransitionWrapper>
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
                        path="/edit/questionset/:id"
                        component={EditQuestionSet}
                    />
                    <Route
                        exact
                        path="/edit/question/:id"
                        component={EditQuestion}
                    />
                    <Route exact path="/login" component={LogIn} />
                    <Route exact path="/user-record" component={UserRecord} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/test" component={Test} />
                    <Route
                        exact
                        path="/test-record/:id"
                        component={TestRecord}
                    />
                    <Route exact path="/admin" component={Admin} />
                </TransitionWrapper>
            </div>
        </BrowserRouter>
    );
};

export default App;
