import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser } from "actions";
import axios from "axios";

const Header = () => {
    const dispatch = useDispatch();

    useState(() => {
        dispatch(fetchUser());
    });

    let auth = useSelector(state => state.auth);

    const renderDropDownMenu = () => {
        if (auth) {
            return (
                <React.Fragment>
                    <Link to="/user-record">
                        <button className="dropdown-item" type="button">
                            Your Profile
                        </button>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/auth/logout">
                        Log out
                    </a>
                </React.Fragment>
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
                        <li className="nav-item">
                            {/* <Link to="/login">
                        <div className="nav-link">Log In for more feature</div>
                    </Link> */}

                            <div className="dropdown">
                                {auth ? (
                                    <span
                                        className="pointer"
                                        id="headerDropdown"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {auth.name}
                                    </span>
                                ) : (
                                    <Link to="/login">
                                        Log in for more feature
                                    </Link>
                                )}
                                <div
                                    className="dropdown-menu animated--grow-in"
                                    aria-labelledby="headerDropdown"
                                >
                                    {renderDropDownMenu()}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="/about"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                about
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
