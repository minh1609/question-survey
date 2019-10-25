import axios from "axios";

import { FETCH_USER, FETCH_QUESTIONS, FETCH_QUESTION } from "./type";

export const fetchUser = () => async (dispatch, getState) => {
    // const res = await axios.get("/api/user");
    // dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchQuestions = () => async (dispatch, getState) => {
    const res = await axios.get("/api/question");
    console.log(res);
    dispatch({ type: FETCH_QUESTIONS, payload: res.data });
};

export const fetchQuestion = id => async (dispatch, getState) => {
    const res = await axios.get(`/api/question${id}`);
    console.log(res);
    dispatch({ type: FETCH_QUESTION, payload: res.data });
};
