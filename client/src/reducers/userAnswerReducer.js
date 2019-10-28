import { ANSWER, CLEAR_ANSWER } from "../actions/type";

export default (state = [], action) => {
    switch (action.type) {
        case ANSWER:
            let newState = [...state];
            newState[action.payload.questionNumber] = action.payload.option;
            return newState;
        case CLEAR_ANSWER:
            return [];
        default:
            return state;
    }
};
