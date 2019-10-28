import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchQuestions } from "../../actions";

const Home = ({ history }) => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questionsSets);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    const redirect = id => {
        history.push(`/questionset/${id}`);
    };

    const renderQuestionList = () => {
        return questions.map(e => (
            <div key={e._id} className="col-sm-12 col-lg-6">
                <div className="card shadow mb-4">
                    <div
                        className="card-header py-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => redirect(e._id)}
                    >
                        <h6 className="m-0 font-weight-bold text-primary">
                            {e.name}
                        </h6>
                    </div>
                    <div className="card-body">{e.description}</div>
                </div>
            </div>
        ));
    };

    return (
        <div className="text-center">
            <div className="row">{renderQuestionList()}</div>
            <button
                className="btn btn-success btn-rounded shadow mx-auto p-3"
                onClick={() => {
                    history.push("/create/questionset");
                }}
            >
                Create your own Question Set
            </button>
        </div>
    );
};

export default Home;
