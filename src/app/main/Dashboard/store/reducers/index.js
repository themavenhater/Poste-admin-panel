import {combineReducers} from "redux";
import articlesReducer from "../../../Articles/store/reducers/articles.reducer";
import documentsReducer from "../../../Document/store/reducers/documents.reducer";
import feedbackReducer from "../../../feedback/store/reducers/feedbacks.reducer";
import notificationsReducer from "../../../notifications/store/reducers/notifications.reducer";
import regionsJobs from "../../../RegionsJobs/store/reducers/regionsJobs.reducer";
import servicesReducer from "../../../Service/store/reducers/services.reducer";
import typesReducer from "../../../Service/store/reducers/types.reducer";

const reducer = combineReducers({
  articlesReducer,
  documentsReducer,
  feedbackReducer,
  notificationsReducer,
  regionsJobs,
  servicesReducer,
  typesReducer
});

export default reducer;
