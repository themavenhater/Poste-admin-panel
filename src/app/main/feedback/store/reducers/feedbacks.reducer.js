import * as Actions from '../actions';

const initialState = {
  feedback      : [],
  searchText: ''
};

const feedbackReducer = function (state = initialState, action) {
  switch ( action.type )
  {
    case Actions.GET_FEEDBACKS:
    {
      return {
        ...state,
        feedback: action.payload
      };
    }
    case Actions.SET_TYPES_SEARCH_TEXT:
    {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    default:
    {
      return state;
    }
  }
};

export default feedbackReducer;
