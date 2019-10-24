import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser } from "../actions/index";
import Payment from "./Payment";

export class Header extends Component {
    render() {
        return <h1>Header</h1>;
    }
}

const mapStateToProps = state => ({
    // auth: state.auth
});

//action creator
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
