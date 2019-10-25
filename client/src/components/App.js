import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../style.css";

import QuestionList from "./QuestionComponent/QuestionList";
import Home from "./QuestionComponent/Home";

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
                        path="/question/:id"
                        component={QuestionList}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
