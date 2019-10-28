//THIS COMPONENT RENDER EACH QUESTION AND ITS OPTIONS IN QUESTION LIST
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import mySwal from "services/swal";

import { answer, fetchQuestion } from "../../actions";
import EditQuestion from "components/QuestionComponent/EditQuestion";
import QuestionForm from "components/FormComponent/QuestionForm";

//data: {option, _id, question}
//questionNumber: order of question in QuestionSet array
//setId: an Id of question set where this question belong to

const Question = ({ data, questionNumber, setId, history }) => {
    const dispatch = useDispatch();
    let userAnswer = useSelector(state => state.userAnswer);

    const convertNumber = n => {
        if (n === undefined) return "...";
        return String.fromCharCode(n + 65);
    };

    const submitAnswer = (questionNumber, option) => {
        dispatch(answer(questionNumber, option));
    };

    const deleteQuestion = async () => {
        let result = await axios.delete(
            `/api/questionset/${setId}/${data._id}`
        );
        if (result.status === 200 || result.status === 201)
            dispatch(fetchQuestion(setId));
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
        <div class="card shadow mb-4 border-bottom-secondary">
            <div class="card-header">
                <div style={{ float: "right" }} className="pointer icon">
                    <Link to={`/edit/question/${data._id}`} className="mx-2">
                        <i className="fas fa-pen-square  hover-green" />
                    </Link>

                    <div onClick={deleteQuestion}>
                        <i className="fas fa-trash hover-red"></i>
                    </div>
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
