//Display each question List
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Question from "./Question";
import { fetchQuestion } from "../../actions";

const QuestionList = props => {
    let id = props.match.params.id;
    const dispatch = useDispatch();
    let questionList = useSelector(state => state.currentQuestionList);

    useEffect(() => {
        dispatch(fetchQuestion(id));
    }, []);

    const renderEachQuestion = () => {
        try {
            return questionList.questions.map(e => (
                <Question key={e._id} data={e} />
            ));
        } catch (error) {}
    };

    return (
        <React.Fragment>
            <div className="mb-4">
                <h3 className="text-gray-800 mb-0">{questionList.name}</h3>
                <i>{questionList.description}</i>
            </div>
            {renderEachQuestion()}
        </React.Fragment>
    );
};

export default QuestionList;
