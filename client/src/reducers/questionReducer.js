import { FETCH_QUESTION, FETCH_QUESTIONS } from "../actions/type";

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return action.payload || false;
        default:
            return state;
    }
};
