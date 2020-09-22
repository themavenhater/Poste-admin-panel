import axios from 'axios';

export const GET_FEEDBACKS = '[POST APP] GET FEEDBACKS';
export const SET_TYPES_SEARCH_TEXT = '[POST APP] SET TYPES SEARCH TEXT';

export function getFeedback() {

  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/feedbacks/');

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_FEEDBACKS,
        payload: response.data
      })
    );
}

export function setTypesSearchText(event) {
  return {
    type: SET_TYPES_SEARCH_TEXT,
    searchText: event.target.value
  }
}

