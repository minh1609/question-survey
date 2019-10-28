import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";

let QuestionForm = props => {
    return (
        <div>
            <label>Question</label>
            <Field
                name="question"
                component="input"
                type="text"
                className="form-control mb-3"
                placeholder="Example: Who is president of United State ?"
            />
            <label>Option for your question, seperate each option by ||</label>
            <Field
                name="option"
                component="textarea"
                type="text"
                className="form-control mb-3"
                placeholder="Example: Donald Trump | Donal Duck | Obama"
            />
            <label>Answer</label>
            <Field
                name="answer"
                component="input"
                type="number"
                className="form-control"
                placeholder="Example: 0"
            />
            <small>0 for first option, 1 for second, ...</small>
        </div>
    );
};

QuestionForm = reduxForm({
    form: "Question"
})(QuestionForm);

export default QuestionForm;
