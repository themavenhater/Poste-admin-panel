import * as Actions from '../actions';

const initialState = {
  notes: [],
  searchText: '',
};

const notesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_NOTES: {
      return {
        ...state,
        notes: action.payload,
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

export default notesReducer;
