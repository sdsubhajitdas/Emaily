import authReducer from "./authReducer";
import surveyFormReducer from "./surveyFormReducer";
import surveyReducer from "./surveyReducer";

const reducers = {
  auth: authReducer,
  surveyForm: surveyFormReducer,
  survey: surveyReducer,
};

export default reducers;
