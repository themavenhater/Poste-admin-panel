import * as Actions from '../actions';

const initialState = {
  data      : [],
  searchText: ''
};

const typesReducer = function (state = initialState, action) {
  switch ( action.type )
  {
    case Actions.GET_TYPES:
    {
      return {
        ...state,
        data: action.payload
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

export default typesReducer;
