import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuestions } from "../../actions";

const QuestionList = () => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    const renderQuestionList = () => {
        return questions.map(e => (
            <div key={e._id} className="col-sm-12 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                            {e.name}
                        </h6>
                    </div>
                    <div className="card-body">{e.description}</div>
                </div>
            </div>
        ));
    };

    return <div className="row">{renderQuestionList()}</div>;
};

export default QuestionList;
