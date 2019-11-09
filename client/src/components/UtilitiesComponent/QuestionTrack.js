import React from "react";
import { useSelector } from "react-redux";

import convertNumber from "function/convertNumberToStr";

const QuestionTrack = ({ children }) => {
    let userAnswer = useSelector(state => state.userAnswer);
    let questions = useSelector(state => state.currentQuestionSet.questions);

    const buttonColor = index => {
        if (userAnswer[index] || userAnswer[index] === 0) {
            return "btn-primary";
        } else {
            return "btn-secondary";
        }
    };

    const renderList = () => {
        if (questions) {
            return questions.map((e, index) => {
                return (
                    <a
                        className={
                            "btn m-1 btn-icon-split text-white " +
                            buttonColor(index)
                        }
                        href={`#question${index}`}
                    >
                        <span className="icon">{index}</span>
                        <span className="text">
                            {convertNumber(userAnswer[index])}
                        </span>
                    </a>
                );
            });
        }
    };

    return (
        <div className="rounded shadow my-3 p-3 sticky-top">
            {renderList()}
            {children}
        </div>
    );
};

export default QuestionTrack;
