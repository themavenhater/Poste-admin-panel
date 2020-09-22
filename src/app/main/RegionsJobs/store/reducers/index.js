import {combineReducers} from 'redux';
import regionsJobs from './regionsJobs.reducer';

const reducer = combineReducers({
    regionsJobs: regionsJobs
});

export default reducer;
