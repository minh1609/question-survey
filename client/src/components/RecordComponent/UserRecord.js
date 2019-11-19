import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const UserRecord = () => {
    const [record, setRecord] = useState([]);
    const [test, setTest] = useState([]); //list of test created by user
    let auth = useSelector(state => state.auth);

    const fetchData = async () => {
        let result = await axios.get("/api/user/record");
        setRecord(result.data);

        let result2 = await axios.get("/api/user/test");
        setTest(result2.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderRecordList = () => {
        return record.map(e => {
            return (
                <tr>
                    <td>
                        <Link to={`/questionset/${e.questionSet._id}`}>
                            <i class="fas fa-link mx-1 pointer"></i>
                        </Link>
                        {e.questionSet.name}
                    </td>
                    <td>{e.firstTimeScore}</td>
                    <td>{e.highestScore}</td>
                </tr>
            );
        });
    };

    const renderTestList = () => {
        return test.map(e => {
            try {
                return (
                    <tr>
                        <td>
                            <Link to={`/questionset/${e.questionSet._id}`}>
                                <i class="fas fa-link mx-1 pointer"></i>
                            </Link>
                            {e.questionSet.name}
                        </td>
                        <td>{e.firstTimeScore}</td>
                        <td>{e.highestScore}</td>
                    </tr>
                );
            } catch (error) {
                return null;
            }
        });
    };

    return (
        <React.Fragment>
            <h4>Info</h4>
            {auth && (
                <React.Fragment>
                    <strong>Name: </strong>
                    {auth.name}{" "}
                    <p>
                        <strong>Email:</strong> {auth.email}
                    </p>
                </React.Fragment>
            )}
            <h4>Your test score</h4>
            <table className="table my-3 table-hover">
                <thead className="thead-dark">
                    <th scope="col">Test Name</th>
                    <th scope="col">First time score</th>
                    <th scope="col">Highest Score</th>
                </thead>
                <tbody>{renderRecordList()}</tbody>
            </table>

            <h4>Your own test</h4>
            <table className="table my-3 table-hover">
                <thead className="thead-dark">
                    <th scope="col">Test Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Modify</th>
                </thead>
                <tbody>{renderTestList()}</tbody>
            </table>
        </React.Fragment>
    );
};

export default UserRecord;
