import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUser } from "actions";

const Header = () => {
    const dispatch = useDispatch();

    useState(() => {
        dispatch(fetchUser());
    });

    let auth = useSelector((state) => state.auth);

    const renderDropDownMenu = () => {
        if (auth) {
            return (
                <React.Fragment>
                    <Link to="/user-record">
                        <button className="dropdown-item" type="button">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Your Profile
                        </button>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/auth/logout">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
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
                            {/* <Link to="/about">about</Link> */}
                        </li>
                    </ul>
                    <ul className="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap">
                        <li className="nav-item">
                            <div className="dropdown">
                                {auth ? (
                                    <span
                                        className="pointer"
                                        id="headerDropdown"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <strong>{auth.name} </strong>
                                        <i className="fas fa-bars fa-xs"></i>
                                    </span>
                                ) : (
                                    <Link to="/login">
                                        <strong>Log in for more feature</strong>
                                    </Link>
                                )}
                                <div
                                    className="dropdown-menu animated--grow-in"
                                    aria-labelledby="headerDropdown"
                                    style={{ zIndex: "2000" }}
                                >
                                    {renderDropDownMenu()}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
