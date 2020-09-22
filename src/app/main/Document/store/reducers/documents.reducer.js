import * as Actions from '../actions';

const initialState = {
  documents      : [],
  searchText: ''
};

const documentsReducer = function (state = initialState, action) {
  switch ( action.type )
  {
    case Actions.GET_DOCUMENTS:
    {
      return {
        ...state,
        documents: action.payload
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

export default documentsReducer;
