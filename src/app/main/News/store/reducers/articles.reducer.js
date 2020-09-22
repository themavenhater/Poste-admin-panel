import * as Actions from '../actions';
import _ from './node_modules/@lodash';

const initialState = {
    entities: null,
    searchText: '',
    routeParams: {},
};

const articlesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_CLIENTS: {
            return {
                ...state,
                entities: _.keyBy(action.payload, '_id'),
                routeParams: action.routeParams
            };
        }
        case Actions.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default: {
            return state;
        }
    }
};

export default articlesReducer;