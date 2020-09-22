import * as Actions from '../actions';

/*
const initialState = {
  notifications: [],
  searchText: '',
};
*/

const notificationsReducer = function (state = {
  notifications: [],
  searchText: '',
}, action) {
  switch (action.type) {
    case Actions.GET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
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

export default notificationsReducer;
