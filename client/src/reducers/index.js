import { combineReducers } from "redux";
import authReducer from "./authReducer";
import questionReducer from "./questionSetReducer";
import currentQuestionReducer from "./currentQuestionSetReducer";
import answer from "./userAnswerReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    auth: authReducer,
    questionsSets: questionReducer,
    currentQuestionSet: currentQuestionReducer,
    userAnswer: answer,
    form: formReducer
});
