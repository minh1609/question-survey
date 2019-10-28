import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";

let MetaInfoForm = props => {
    useEffect(() => console.log(props), []);
    return (
        <div>
            <label>Name</label>
            <Field
                name="name"
                component="input"
                type="text"
                className="form-control mb-3"
                placeholder="Enter Title"
            />
            <label>Description</label>
            <Field
                name="description"
                component="textarea"
                type="text"
                className="form-control mb-3"
                placeholder="Enter Description"
            />
        </div>
    );
};

MetaInfoForm = reduxForm({
    form: "QuestionSetMetaInfo"
})(MetaInfoForm);

export default MetaInfoForm;
