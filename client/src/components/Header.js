import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow justify-content-md-center justify-content-start">
            <div className="container">
                <div>
                    <Link to="/">
                        <div class="navbar-brand">Home</div>
                    </Link>
                </div>

                <div
                    class="navbar-collapse collapse justify-content-between align-items-center w-100"
                    id="collapsingNavbar2"
                >
                    <ul class="navbar-nav mx-auto text-md-center text-left">
                        <li class="nav-item">
                            <div class="nav-link">Log In</div>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap">
                        <li class="nav-item">
                            <a
                                className="nav-link"
                                href="https://github.com/minh1609/question-survey"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-github"></i>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a
                                className="nav-link"
                                href="https://minh1609.github.io/portfolio/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="fas fa-user-alt"></i>
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
