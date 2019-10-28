//Display each question List
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import QuestionForm from "../FormComponent/QuestionForm";
import { reset } from "redux-form";
import MySwal from "services/swal";

import Question from "./Question";
import { fetchQuestion } from "../../actions";
import ScoreBar from "components/FormComponent/ScoreBar";

const QuestionSet = props => {
    const dispatch = useDispatch();
    let questionList = useSelector(state => state.currentQuestionSet);
    let userAnswer = useSelector(state => state.userAnswer) || [];
    let form = useSelector(state => state.form.Question);

    let id = props.match.params.id; //question set ID
    let history = props.history;

    useEffect(() => {
        dispatch(fetchQuestion(id)); //auto fetch data when page loaded
        dispatch({ type: "CLEAR_ANSWER" });
    }, []);

    const renderEachQuestion = () => {
        try {
            return questionList.questions.map((e, index) => (
                <Question
                    key={e._id}
                    data={e}
                    questionNumber={index}
                    setId={id}
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
        MySwal.fire({
            title: (
                <h5>
                    Your Score : {score}/{rightAnswer.length}{" "}
                </h5>
            ),
            html: <ScoreBar score={score} totalQuestion={rightAnswer.length} />,
            showConfirmButton: false
        });
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
        await axios.delete(`/api/questionset/${id}`);
        history.push("/");
    };

    return (
        <React.Fragment>
            <div className="mb-4">
                <button
                    className="mx-auto btn btn-info float mb-4 shadow"
                    onClick={marking}
                    style={{ float: "right" }}
                >
                    Mark my score
                </button>
                <button
                    style={{ float: "right" }}
                    className="btn btn-danger shadow mr-2"
                    onClick={deleteQuestionSet}
                >
                    Delete
                </button>
                <h3 className="text-gray-800 mb-0">{questionList.name}</h3>
                <i>{questionList.description}</i>
            </div>
            {renderEachQuestion()}

            <h4>Add new question to this set</h4>

            {/* Add new question to set */}
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
    );
};

export default QuestionSet;
