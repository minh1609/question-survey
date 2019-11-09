import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TestRecord = ({ match }) => {
    let id = match.params.id;
    const [record, setRecord] = useState([]);

    const fetchData = async () => {
        let result = await axios.get(`/api/test/record/${id}`);
        console.log(result.data);
        setRecord(result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderRecordList = () => {
        if (true) {
            return record.map(e => {
                return (
                    <tr>
                        <td>{e.user.name}</td>
                        <td>{e.user.email}</td>
                        <td>{e.highestScore}</td>
                        <td>{e.firstTimeScore}</td>
                    </tr>
                );
            });
        }
    };

    return (
        <React.Fragment>
            <h4>Test record</h4>
            <table className="table my-3 table-hover">
                <thead className="thead-dark">
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">First time score</th>
                    <th scope="col">Highest Score</th>
                </thead>
                <tbody>{renderRecordList()}</tbody>
            </table>
            <Link to={`/questionset/${id}`}>
                <button className="btn btn-secondary">
                    <i className="fas fa-arrow-left"></i> Come Back
                </button>
            </Link>
        </React.Fragment>
    );
};

export default TestRecord;
