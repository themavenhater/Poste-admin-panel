import {combineReducers} from "redux";
import notificationsReducer from './notifications.reducer'
import regionsJobsReducer from '../../../RegionsJobs/store/reducers/regionsJobs.reducer'
const reducer = combineReducers({
    notificationsReducer,
    regionsJobsReducer
});

export default reducer;
