import {combineReducers} from 'redux';
import services from './services.reducer';
import types from './types.reducer';
import service from './service.reducer';

const reducer = combineReducers({
    services,
    service,
    types
});

export default reducer;
