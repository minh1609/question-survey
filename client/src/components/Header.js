import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
    return <h1>Header</h1>;
};

const mapStateToProps = state => ({
    // auth: state.auth
});

//action creator
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
