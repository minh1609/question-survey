//THIS COMPONENT RENDER EACH QUESTION AND ITS OPTIONS IN QUESTION LIST
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { answer } from "../../actions";

//data {option, _id, question}
//questionNumber: order of question in QuestionSet array

const Question = ({ data, questionNumber }) => {
    const convertNumber = n => {
        if (n === undefined) return "...";
        return String.fromCharCode(n + 65);
    };

    const dispatch = useDispatch();
    let userAnswer = useSelector(state => state.userAnswer);

    const submitAnswer = (questionNumber, option) => {
        dispatch(answer(questionNumber, option));
        console.log(answer(questionNumber, option));
    };

    const renderOption = () => {
        return data.option.map((e, index) => (
            <div
                class="col-xl-3 col-md-6 mb-2"
                onClick={() => submitAnswer(questionNumber, index)}
                style={{ cursor: "pointer" }}
                key={index}
            >
                <div class="card">
                    <div class="card-body" style={{ padding: "10px" }}>
                        <div class="row no-gutters align-items-center">
                            <div class="col ">
                                {convertNumber(index)}. {e}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div class="card shadow mb-4 border-left-primary">
            <div class="card-header">
                <div style={{ float: "right" }}>
                    <i className="fas fa-pen-square mx-2"></i>
                    <i className="fas fa-trash"></i>
                </div>
                {questionNumber}. {data.question}
            </div>
            <div class="card-body row">{renderOption()}</div>
            <div className="mb-2 ml-3">
                Your Answer is{" "}
                <strong> {convertNumber(userAnswer[questionNumber])}</strong>
            </div>
        </div>
    );
};

export default Question;
