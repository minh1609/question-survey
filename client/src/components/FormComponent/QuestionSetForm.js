import React from "react";
import { Field, reduxForm } from "redux-form";

let Form = (props) => {
    return (
        <div>
            <label>Name</label>
            <Field
                name="name"
                component="input"
                type="text"
                className="form-control mb-3"
                placeholder="Enter Name"
                autoComplete="off"
            />
            <label>Description</label>
            <Field
                name="description"
                component="textarea"
                type="text"
                className="form-control mb-3"
                placeholder="Enter Description"
                autoComplete="off"
                style={{ whiteSpace: "pre-line" }}
            />

            <label>Topic</label>
            <Field
                name="topic"
                component="select"
                className="form-control mb-3"
            >
                <option value="science">Science</option>
                <option value="sport">Sport</option>
                <option value="movie">Movie</option>
                <option value="mix">Mix</option>
            </Field>

            <label>Time</label>
            <Field
                name="time"
                component="input"
                type="number"
                className="form-control mb-3"
            />
        </div>
    );
};

Form = reduxForm({
    form: "QuestionSetMetaInfo",
})(Form);

export default Form;
