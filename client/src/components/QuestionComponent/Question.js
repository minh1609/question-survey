//THIS COMPONENT RENDER EACH QUESTION AND ITS OPTIONS IN QUESTION LIST
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { DefaultPopUp } from "services/swal";

import { answer, fetchQuestion } from "../../actions";

//data: {option, _id, question, owner}
//questionNumber: order of question in QuestionSet array
//setId: an Id of question set where this question belong to

const Question = ({ data, questionNumber, setId, isAuthorized }) => {
    const dispatch = useDispatch();
    let selectedAnswer = useSelector(state => state.userAnswer[questionNumber]);

    const convertNumber = n => {
        if (n === undefined) return "...";
        return String.fromCharCode(n + 65);
    };

    const submitAnswer = (questionNumber, option) => {
        dispatch(answer(questionNumber, option));
    };

    const deleteQuestion = async () => {
        DefaultPopUp.fire({
            title: "Confirm Delete"
        }).then(async ({ value }) => {
            if (value) {
                let result = await axios.delete(
                    `/api/questionset/${setId}/${data._id}`
                );
                if (result.status === 200 || result.status === 201) {
                    dispatch(fetchQuestion(setId));
                    DefaultPopUp.fire({ title: "", type: "success" });
                }
            }
        });
    };

    const renderOptionColor = optionIndex => {
        if (optionIndex === selectedAnswer)
            return " bg-info text-gray-100 font-weight-bold";
        else {
            return "";
        }
    };

    const renderOption = () => {
        return data.option.map((e, index) => (
            <div
                className="col-xl-3 col-md-6 mb-2"
                onClick={() => submitAnswer(questionNumber, index)}
                style={{ cursor: "pointer" }}
                key={index}
            >
                <div className={"card" + renderOptionColor(index)}>
                    <div className="card-body" style={{ padding: "10px" }}>
                        <div className="row no-gutters align-items-center">
                            <div className="col ">
                                {convertNumber(index)}. {e}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div class="card shadow mb-4 border-bottom-secondary">
            <div class="card-header">
                {/* Edit and Delete button is rendered only for Authorized user*/}
                {isAuthorized && (
                    <div style={{ float: "right" }} className="pointer icon">
                        <Link
                            to={`/edit/question/${data._id}`}
                            className="mx-2"
                        >
                            <i className="fas fa-pen-square  hover-green" />
                        </Link>

                        <div onClick={deleteQuestion}>
                            <i className="fas fa-trash hover-red"></i>
                        </div>
                    </div>
                )}
                {questionNumber}. {data.question}
            </div>
            <div class="card-body row">{renderOption()}</div>
        </div>
    );
};

export default Question;
