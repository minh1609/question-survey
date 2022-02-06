import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import QuestionSetForm from "../FormComponent/QuestionSetForm";
import axios from "axios";

let CreateQuestion = ({ history }) => {
    const dispatch = useDispatch();
    let form = useSelector((state) => state.form.QuestionSetMetaInfo);

    useEffect(() => {
        dispatch({ type: "CLEAR" });
    });

    const handleClick = async () => {
        let data = await axios.post("/api/questionset", {
            name: form.values.name,
            description: form.values.description,
            topic: form.values.topic,
        });

        if (data.status === 200 || data.status === 201) {
            alert("sucecessfully createad");
            history.push(`/questionset/${data.data._id}`);
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
