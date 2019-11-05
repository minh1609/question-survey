import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser } from "actions";

const Header = () => {
    const dispatch = useDispatch();

    useState(() => {
        dispatch(fetchUser());
    });

    let auth = useSelector(state => state.auth);

    const renderLogInName = () => {
        if (auth) {
            return <Link to="/login">Hi, {auth.name}</Link>;
        } else {
            return (
                <li className="nav-item">
                    <Link to="/login">
                        <div className="nav-link">Log In for more feature</div>
                    </Link>
                </li>
            );
        }
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow justify-content-md-center justify-content-start">
            <div className="container">
                <div>
                    <Link to="/">
                        <div className="navbar-brand">Home</div>
                    </Link>
                </div>

                <div
                    className="navbar-collapse collapse justify-content-between align-items-center w-100"
                    id="collapsingNavbar2"
                >
                    <ul className="navbar-nav mx-auto text-md-center text-left">
                        {renderLogInName()}
                    </ul>
                    <ul className="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="https://github.com/minh1609/question-survey"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-github"></i>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="https://minh1609.github.io/portfolio/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fas fa-user-alt"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
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
