import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="bg-white p-4"
      style={{
        position: "absolute",
        left: "0",
        bottom: "0",
        right: "0",
        width: "100%"
      }}
    >
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <Link to="/about">About</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
