import React, { useEffect } from "react";
import axios from "axios";
import { change } from "redux-form";
import { useDispatch, useSelector } from "react-redux";

import QuestionSetForm from "components/FormComponent/QuestionSetForm";
import { DefaultPopUp } from "services/swal";

const EditQuestionSet = ({ match, history }) => {
    let id = match.params.id;
    const dispatch = useDispatch();
    let form = useSelector((state) => state.form.QuestionSetMetaInfo);
    let questionSet = useSelector((state) => state.currentQuestionSet);

    const initFormValue = async () => {
        let name, description, topic, time;

        //fetch data if data is not availble in state

        if (
            Object.keys(questionSet).length === 0 &&
            questionSet.constructor === Object
        ) {
            let result = await axios.get(`/api/questionset/${id}`);

            description = result.data.description;
            name = result.data.name;
            topic = result.data.topic;
            time = result.data.time;
        } else {
            name = questionSet.name;
            description = questionSet.description;
            topic = questionSet.topic;
            time = questionSet.time;
        }

        dispatch(change("QuestionSetMetaInfo", "name", name));
        dispatch(change("QuestionSetMetaInfo", "description", description));
        dispatch(change("QuestionSetMetaInfo", "topic", topic));
        dispatch(change("QuestionSetMetaInfo", "time", time));
    };

    useEffect(() => {
        initFormValue();
    }, []);

    const handleClick = async () => {
        let { name, description, topic, time } = form.values;
        let result = await axios.patch(`/api/questionset/${id}`, {
            name,
            description,
            topic,
            time,
        });
        if (result.status === 200 || result.status === 201) {
            DefaultPopUp.fire({ type: "success" });
        }
    };

    return (
        <div>
            <h4>Edit question</h4>
            <QuestionSetForm />
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

export default EditQuestionSet;
