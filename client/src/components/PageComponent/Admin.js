import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
    let user = useSelector((state) => state.user);

    return (
        <div>
            <h1>Admin Page</h1>
        </div>
    );
};

export default Admin;
