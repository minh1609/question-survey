//Display each question List
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import QuestionForm from "../FormComponent/QuestionForm";
import { reset } from "redux-form";

import Question from "./Question";
import { fetchQuestion } from "../../actions";

const QuestionSet = props => {
    const dispatch = useDispatch();
    let questionList = useSelector(state => state.currentQuestionSet);
    let userAnswer = useSelector(state => state.userAnswer) || [];
    let form = useSelector(state => state.form.Question);

    let id = props.match.params.id; //question set ID

    useEffect(() => {
        dispatch(fetchQuestion(id)); //auto fetch data when page loaded
    }, []);

    const renderEachQuestion = () => {
        try {
            return questionList.questions.map((e, index) => (
                <Question key={e._id} data={e} questionNumber={index} />
            ));
        } catch (error) {
            return <div>Loading</div>;
        }
    };

    const marking = () => {
        let score = 0;
        console.log(userAnswer);
        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i] === questionList.answers[i]) {
                score++;
            }
        }
        alert(score);
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

    return (
        <React.Fragment>
            <div className="mb-4">
                <h3 className="text-gray-800 mb-0">{questionList.name}</h3>
                <i>{questionList.description}</i>
            </div>
            {renderEachQuestion()}
            <button
                className="mx-auto btn btn-primary float mb-4"
                onClick={marking}
            >
                Mark my score
            </button>
            <h4>Add new question to this set</h4>

            {/* Add new question to set */}
            <QuestionForm
                initialValues={{ question: "", option: "", answer: "" }}
            />
            <button onClick={addNewQuestion}>Add this question</button>
        </React.Fragment>
    );
};

export default QuestionSet;
