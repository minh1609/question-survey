import React, { useState } from "react";

import { useSelector } from "react-redux";
import axios from "axios";

const Admin = () => {
    const [reportData, setReportData] = useState({
        "Report is empty": "Click button to fetch report",
    });
    let user = useSelector((state) => state.auth);

    let getReport = async () => {
        let res = await axios.get("/api/report");
        setReportData(res.data);
    };

    let renderReportData = () => {
        if (Object.keys(reportData).length === 0) return;

        return Object.keys(reportData).map((k) => {
            return (
                <div key={k}>
                    {k}: {reportData[k]}
                </div>
            );
        });
    };

    return (
        <div>
            {user && user.role === "admin" ? (
                <div>
                    <h1>Admin Page</h1>
                    <p>Hello, admin {user.name}</p>
                    <button className="btn btn-dark mb-5" onClick={getReport}>
                        Generate report
                    </button>

                    {renderReportData()}
                </div>
            ) : (
                <p>You are not admin</p>
            )}
        </div>
    );
};

export default Admin;
