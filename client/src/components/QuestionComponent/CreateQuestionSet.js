import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, change } from "redux-form";
import QuestionSetForm from "../FormComponent/QuestionSetForm";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { fetchQuestion } from "actions";

let CreateQuestion = () => {
    const dispatch = useDispatch();
    let form = useSelector((state) => state.form.QuestionSetMetaInfo);
    const history = useHistory();

    //set form default value
    useEffect(() => {
        dispatch({ type: "CLEAR" });
        dispatch(change("QuestionSetMetaInfo", "topic", "science"));
        dispatch(change("QuestionSetMetaInfo", "time", 60));
    }, []);

    const handleClick = async () => {
        let res = await axios.post("/api/questionset", {
            name: form.values.name,
            description: form.values.description,
            topic: form.values.topic,
            time: form.values.time,
        });

        if (res.status === 200 || res.status === 201) {
            alert(
                "new qyestion sucecessfully createad, click to redirect to the new question"
            );
            history.push(`/questionset/${res.data._id}`);
        }
    };

    return (
        <div>
            <QuestionSetForm initialValues={{ name: "", description: "" }} />
            <button
                className="btn btn-success p-2 shadow"
                onClick={handleClick}
            >
                Create
            </button>
        </div>
    );
};

CreateQuestion = reduxForm({
    form: "QuestionSetMeta",
})(CreateQuestion);

export default CreateQuestion;
