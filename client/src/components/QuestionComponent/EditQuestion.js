import React, { useEffect, useState } from "react";
import axios from "axios";
import { change } from "redux-form";
import { useDispatch, useSelector } from "react-redux";

import QuestionForm from "components/FormComponent/QuestionForm";

const EditQuestion = ({ match, history }) => {
    let id = match.params.id;
    const dispatch = useDispatch();
    let form = useSelector(state => state.form.Question);

    const initFormValue = async () => {
        let data = await axios.get(`/api/question/${id}`);
        let question = data.data;
        dispatch(change("Question", "question", question.question));
        dispatch(change("Question", "answer", question.answer));

        dispatch(change("Question", "option", question.option.join("||")));
    };

    useEffect(() => {
        initFormValue();
    }, []);

    const handleClick = async () => {
        let { question, answer, option } = form.values;
        let result = await axios.put(`/api/question/${id}`, {
            question,
            answer,
            option
        });
        if (result.status === 200 || result.status === 201) {
            history.goBack();
        }
    };

    return (
        <div>
            <h4>Edit question</h4>
            <QuestionForm />
            <button className="btn btn-primary my-3 mr-3" onClick={handleClick}>
                Submit Change
            </button>
            <button
                className="btn btn-secondary"
                onClick={() => {
                    history.goBack();
                }}
            >
                Go back
            </button>
        </div>
    );
};

export default EditQuestion;
