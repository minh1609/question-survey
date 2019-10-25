import { FETCH_QUESTION } from "../actions/type";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_QUESTION:
            return action.payload;
        default:
            return state;
    }
};
