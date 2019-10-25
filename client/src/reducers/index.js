import { combineReducers } from "redux";
import authReducer from "./authReducer";
import questionReducer from "./questionReducer";
import currentQuestionReducer from "./currentQuestionReducer";

export default combineReducers({
    auth: authReducer,
    questions: questionReducer,
    currentQuestion: currentQuestionReducer
});
