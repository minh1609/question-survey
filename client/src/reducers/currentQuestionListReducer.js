import { FETCH_QUESTION, CLEAR } from "../actions/type";

let originalState = {
    name: "",
    description: "",
    questions: [],
    answers: []
};

export default (state = originalState, action) => {
    switch (action.type) {
        case FETCH_QUESTION:
            return action.payload;
        case CLEAR:
            return originalState;
        default:
            return state;
    }
};
