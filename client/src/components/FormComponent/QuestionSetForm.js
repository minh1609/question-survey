import React from "react";
import { Field, reduxForm } from "redux-form";

let Form = props => {
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
    </div>
  );
};

Form = reduxForm({
  form: "QuestionSetMetaInfo"
})(Form);

export default Form;
