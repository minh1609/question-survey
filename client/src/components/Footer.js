import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer
            className="sticky-footer bg-white"
            style={{
                position: "absolute",
                left: "0",
                bottom: "0",
                width: "100%"
            }}
        >
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <Link to="/about">About</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
