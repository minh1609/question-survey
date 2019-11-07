import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const UserRecord = () => {
    const [record, setRecord] = useState({});

    const fetchData = async () => {
        let result = await axios.get("/api/user/record");
        console.log(result.data);
    };

    useState(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div></div>
        </div>
    );
};

export default UserRecord;
