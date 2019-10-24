import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";

export class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>{/* <Route exact path="/" component={} /> */}</Switch>
            </BrowserRouter>
        );
    }
}
