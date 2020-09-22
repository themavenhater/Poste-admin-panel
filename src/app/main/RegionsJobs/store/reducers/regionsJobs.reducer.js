import * as Actions from '../actions';

// const initialState = ;

const regionsJobs = function (state = {
  regions: [],
  jobs: [],
  searchText: ''
}, action) {
  switch (action.type) {
    case Actions.GET_REGIONS: {
      return {
        ...state,
        regions: action.payload
      };
    }
    case Actions.GET_JOBS: {
      return {
        ...state,
        jobs: action.payload
      };
    }
    case Actions.SET_TYPES_SEARCH_TEXT: {
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

export default regionsJobs;
