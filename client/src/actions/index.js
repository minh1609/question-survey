import axios from "axios";

import { FETCH_USER, FETCH_QUESTIONS, FETCH_QUESTION, ANSWER } from "./type";

export const fetchQuestions = () => async (dispatch, getState) => {
    const res = await axios.get("/api/questionset");
    dispatch({ type: FETCH_QUESTIONS, payload: res.data });
};

export const fetchQuestion = id => async (dispatch, getState) => {
    const res = await axios.get(`/api/questionset/${id}`);
    dispatch({ type: FETCH_QUESTION, payload: res.data });
};

export const answer = (questionNumber, option) => {
    return { type: ANSWER, payload: { questionNumber, option } };
};
