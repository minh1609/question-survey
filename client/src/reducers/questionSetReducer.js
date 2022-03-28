import { FETCH_QUESTIONS } from "../actions/type";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            state = {};
            for (let e of action.payload) {
                state[e._id] = e;
            }

            return state || false;
        default:
            return state;
    }
};
