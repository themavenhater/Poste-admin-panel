import * as Actions from '../actions';

const initialState = {
  articles: [],
  tags: [],
  searchText: '',
};

const articlesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ARTICLES: {
      return {
        ...state,
        articles: action.payload,
      };
    }
    case Actions.GET_TAGS: {
      return {
        ...state,
        tags: action.payload,
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
