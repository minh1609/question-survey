import React, { useEffect } from "react";
import axios from "axios";
import { change } from "redux-form";
import { useDispatch, useSelector } from "react-redux";

import QuestionSetForm from "components/FormComponent/QuestionSetForm";
import { DefaultPopUp } from "services/swal";

const EditQuestionSet = ({ match, history }) => {
    let id = match.params.id;
    const dispatch = useDispatch();
    let form = useSelector(state => state.form.QuestionSetMetaInfo);
    let questionSet = useSelector(state => state.currentQuestionSet);

    const initFormValue = async () => {
        let name, description;
        if (
            Object.keys(questionSet).length === 0 &&
            questionSet.constructor === Object
        ) {
            //fetch data if data is not availble in state
            let result = await axios.get(`/api/questionset/${id}`);

            description = result.data.description;
            name = result.data.name;
        } else {
            name = questionSet.name;
            description = questionSet.description;
        }

        dispatch(change("QuestionSetMetaInfo", "name", name));
        dispatch(change("QuestionSetMetaInfo", "description", description));
    };

    useEffect(() => {
        initFormValue();
    }, []);

    const handleClick = async () => {
        let { name, description } = form.values;
        let result = await axios.patch(`/api/questionset/${id}`, {
            name,
            description
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
