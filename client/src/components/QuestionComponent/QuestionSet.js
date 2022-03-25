// This Component display each question set
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import QuestionForm from "../FormComponent/QuestionForm";
import { reset } from "redux-form";
import { DefaultPopUp } from "services/swal";
import { Link } from "react-router-dom";

import Question from "./Question";
import { fetchQuestion } from "actions";
import ScoreBar from "components/UtilitiesComponent/ScoreBar";
import AnswerTracking from "components/UtilitiesComponent/AnswerTracking";

const QuestionSet = (props) => {
    const dispatch = useDispatch();
    let questionList = useSelector((state) => state.currentQuestionSet);
    let userAnswer = useSelector((state) => state.userAnswer) || [];
    let form = useSelector((state) => state.form.Question);
    let auth = useSelector((state) => state.auth);

    let id = props.match.params.id; //question set ID
    let history = props.history;

    useEffect(() => {
        dispatch(fetchQuestion(id)); //auto fetch data when page loaded
        dispatch({ type: "CLEAR_ANSWER" });
    }, []);

    //is user the owner of this question set ???
    const isAuthorized = () => {
        if (
            (auth &&
                questionList.owner &&
                auth._id.localeCompare(questionList.owner._id) === 0) ||
            (auth && auth.role && auth.role === "admin")
        ) {
            return true;
        } else {
            return false;
        }
    };

    const renderEachQuestion = () => {
        try {
            return questionList.questions.map((e, index) => (
                <Question
                    key={e._id}
                    data={e}
                    questionNumber={index}
                    setId={id}
                    isAuthorized={isAuthorized()}
                />
            ));
        } catch (error) {
            return <div>Loading</div>;
        }
    };

    const marking = () => {
        let score = 0;
        let rightAnswer = questionList.questions.map((e) => e.answer) || [];

        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i] === rightAnswer[i]) {
                score++;
            }
        }
        let percentScore = (score / rightAnswer.length) * 100;
        DefaultPopUp.fire({
            title: <h5>Your Score : </h5>,
            html: <ScoreBar score={score} totalQuestion={rightAnswer.length} />,
            showConfirmButton: false,
        });

        if (auth) {
            axios.post("/api/report", { score: percentScore, setId: id });
        }
    };

    const addNewQuestion = async () => {
        let { question, option, answer } = form.values;
        await axios.post(`/api/questionset/${id}`, {
            question,
            option,
            answer,
        });
        dispatch(fetchQuestion(id));
        dispatch(reset("Question"));
    };

    const deleteQuestionSet = async () => {
        DefaultPopUp.fire({ title: "Do you want to delete this set ?" }).then(
            async ({ value }) => {
                if (value) {
                    let data = await axios.delete(`/api/questionset/${id}`);
                    if (data.status === 200 || data.status === 201) {
                        history.push("/");
                        DefaultPopUp.fire({ type: "success" });
                    }
                }
            }
        );
    };

    //only appear for authorized user
    const renderDropdownMenu = () => {
        if (isAuthorized()) {
            return (
                <span className="dropdown" style={{ zIndex: "3000" }}>
                    <i
                        className="fas fa-bars fa-xs text-gray-600 pointer"
                        id="dropDownQuestionSet"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    ></i>

                    <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                    >
                        <Link to={`/test-record/${id}`}>
                            <button className="dropdown-item" type="button">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Record
                            </button>
                        </Link>

                        <Link to={`/edit/questionset/${id}`}>
                            <button className="dropdown-item" type="button">
                                <i className="fas fa-pen fa-sm fa-fw mr-2 text-gray-400"></i>
                                Edit Meta Description
                            </button>
                        </Link>

                        <div className="dropdown-divider"></div>
                        <button
                            className="dropdown-item"
                            type="button"
                            onClick={deleteQuestionSet}
                        >
                            <i className="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
                            Delete
                        </button>
                    </div>
                </span>
            );
        }
    };

    return (
        <div>
            {/* MENU BOX */}
            <div
                className="mb-2 p-3 shadow mb-3 row border-bottom-primary
                "
                style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    minWidth: "200px",
                }}
            >
                <div className="col-10">
                    <h3 className="text-gray-800">
                        {questionList.name} {renderDropdownMenu()}
                    </h3>

                    <p> {questionList.description} </p>
                </div>

                <div className="col-2 p-2"></div>
            </div>
            {/* END MENU BOX */}

            <AnswerTracking>
                <button
                    className=" btn btn-danger m-1 shadow "
                    onClick={marking}
                >
                    Mark
                </button>
            </AnswerTracking>

            {renderEachQuestion()}

            {/*Form to add new question to set */}
            {isAuthorized() && (
                <div className="card shadow my-4">
                    <a
                        href="#collapseCard"
                        className="d-block card-header py-3"
                        data-toggle="collapse"
                        role="button"
                        aria-expanded="true"
                        aria-controls="collapseCardExample"
                        style={{ backgroundColor: "#1cc88a" }}
                    >
                        <h6 className="m-0 font-weight-bold text-gray-100">
                            Add new question to this Quiz
                        </h6>
                    </a>

                    {/* Add new question to question set card */}
                    <div className="collapse" id="collapseCard">
                        <div className="card-body">
                            <QuestionForm
                                initialValues={{
                                    question: "",
                                    option: "",
                                    answer: "",
                                }}
                            />
                            <button
                                className="btn btn-success shadow my-2"
                                onClick={addNewQuestion}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionSet;
