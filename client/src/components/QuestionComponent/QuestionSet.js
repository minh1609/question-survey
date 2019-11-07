// This Component display each question set
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import QuestionForm from "../FormComponent/QuestionForm";
import { reset } from "redux-form";
import { DefaultPopUp } from "services/swal";

import Question from "./Question";
import { fetchQuestion } from "actions";
import ScoreBar from "components/FormComponent/ScoreBar";

const QuestionSet = props => {
    const dispatch = useDispatch();
    let questionList = useSelector(state => state.currentQuestionSet);
    let userAnswer = useSelector(state => state.userAnswer) || [];
    let form = useSelector(state => state.form.Question);
    let auth = useSelector(state => state.auth);

    let id = props.match.params.id; //question set ID
    let history = props.history;

    useEffect(() => {
        dispatch(fetchQuestion(id)); //auto fetch data when page loaded
        dispatch({ type: "CLEAR_ANSWER" });
    }, []);

    const isAuthorized = () => {
        if (auth && auth._id.localeCompare(questionList.owner) === 0) {
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
        let rightAnswer = questionList.questions.map(e => e.answer) || [];

        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i] === rightAnswer[i]) {
                score++;
            }
        }
        let percentScore = (score / rightAnswer.length) * 100;
        DefaultPopUp.fire({
            title: <h5>Your Score : percentScore </h5>,
            html: <ScoreBar score={score} totalQuestion={rightAnswer.length} />,
            showConfirmButton: false
        });

        axios.post("/api/record", { score: percentScore, setId: id });
    };

    const addNewQuestion = async () => {
        let { question, option, answer } = form.values;
        await axios.post(`/api/questionset/${id}`, {
            question,
            option,
            answer
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

    return (
        <div>
            <div
                className="mb-2 sticky-top p-3 shadow mb-3"
                style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    minWidth: "200px"
                }}
            >
                <button
                    className="mx-auto btn btn-info float mb-4 shadow"
                    onClick={marking}
                    style={{ float: "right" }}
                >
                    Mark my score
                </button>
                {isAuthorized() && (
                    <button
                        style={{ float: "right" }}
                        className="btn btn-danger shadow mr-2"
                        onClick={deleteQuestionSet}
                    >
                        Delete
                    </button>
                )}
                <h3 className="text-gray-800">{questionList.name}</h3>
                <i> {questionList.description} </i>
            </div>
            {renderEachQuestion()}

            {/*Form to add new question to set */}
            {isAuthorized() && (
                <React.Fragment>
                    <h4>Add new question to this set</h4>
                    <QuestionForm
                        initialValues={{ question: "", option: "", answer: "" }}
                    />
                    <button
                        className="btn btn-success shadow my-2"
                        onClick={addNewQuestion}
                    >
                        Add
                    </button>
                </React.Fragment>
            )}
        </div>
    );
};

export default QuestionSet;
