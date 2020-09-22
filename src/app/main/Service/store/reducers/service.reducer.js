import * as Actions from '../actions';

/*const initialState = {
  data: null
};*/

const serviceReducer = function (state = {data:null}, action) {
  switch (action.type) {
    case Actions.GET_SERVICE: {
      // console.log('reducer', action.payload);
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.SAVE_SERVICE: {
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

export default serviceReducer;
