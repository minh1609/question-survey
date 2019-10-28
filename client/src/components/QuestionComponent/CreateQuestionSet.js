import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import QuestionSetForm from "../FormComponent/QuestionSetForm";
import axios from "axios";

let CreateQuestion = () => {
    const dispatch = useDispatch();
    let form = useSelector(state => state.form.QuestionSetMetaInfo);

    useEffect(() => {
        dispatch({ type: "CLEAR" });
    });

    const handleClick = async () => {
        let data = await axios.post("/api/questionset", {
            name: form.values.name,
            description: form.values.description
        });
        if (data.status === 200 || data.status === 201) {
            alert("sucecessfully createad");
            //history push
        }
    };

    return (
        <div>
            <QuestionSetForm initialValues={{ name: "", description: "" }} />
            <button className="btn btn-primary p-2" onClick={handleClick}>
                Create
            </button>
        </div>
    );
};

CreateQuestion = reduxForm({
    form: "QuestionSetMeta"
})(CreateQuestion);

export default CreateQuestion;
