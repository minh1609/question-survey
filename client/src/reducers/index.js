import { combineReducers } from "redux";
import authReducer from "./authReducer";
import questionReducer from "./questionListReducer";
import currentQuestionReducer from "./currentQuestionListReducer";
import answer from "./userAnswerReducer";

export default combineReducers({
    auth: authReducer,
    questionsList: questionReducer,
    currentQuestionList: currentQuestionReducer,
    userAnswer: answer
});
