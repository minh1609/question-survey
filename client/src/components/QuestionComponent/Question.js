import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { answer } from "../../actions";

//data {option, _id, question}
const Question = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, []);

    const dispatch = useDispatch();
    let userAnswer = useSelector(state => state.userAnswer);

    const renderOption = () => {
        return data.option.map(e => (
            <div class="col-xl-3 col-md-6 mb-2">
                <div class="card">
                    <div class="card-body" style={{ padding: "10px" }}>
                        <div class="row no-gutters align-items-center">
                            <div class="col ">{e}</div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div class="card shadow mb-4 border-left-primary">
            <div class="card-header">{data.question}</div>
            <div class="card-body row">{renderOption()}</div>
        </div>
    );
};

export default Question;
