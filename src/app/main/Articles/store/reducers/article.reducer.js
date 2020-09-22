import * as Actions from '../actions';

const initialState = {
    data: null
};

const articleReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_CLIENT_PROFILE: {
            return {
                ...state,
                data: action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default articleReducer;
