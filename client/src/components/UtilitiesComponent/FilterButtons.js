import React from "react";
import { useDispatch } from "react-redux";
import { fetchQuestions, fetchQuestionsByTopic } from "../../actions";

const FilterButtons = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <button
                className="btn btn-dark m-1"
                onClick={() => {
                    dispatch(fetchQuestions());
                }}
            >
                All
            </button>
            <button
                className="btn btn-light m-1"
                onClick={() => {
                    dispatch(fetchQuestionsByTopic("science"));
                }}
            >
                Science
            </button>
            <button
                className="btn btn-light m-1"
                onClick={() => {
                    dispatch(fetchQuestionsByTopic("sport"));
                }}
            >
                Sport
            </button>
            <button
                className="btn btn-light m-1"
                onClick={() => {
                    dispatch(fetchQuestionsByTopic("movie"));
                }}
            >
                Movie
            </button>
            <button
                className="btn btn-light m-1"
                onClick={() => {
                    dispatch(fetchQuestionsByTopic("mix"));
                }}
            >
                Mix
            </button>
        </div>
    );
};

export default FilterButtons;
