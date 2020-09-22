import axios from 'axios';

export const GET_NOTES = '[NOTES APP] GET NOTES';
export const SET_SEARCH_TEXT = '[NOTES APP] SET SEARCH TEXT';

export function getNotes() {
  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/notes');
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_NOTES,
        payload: response.data,
      })
    );
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  }
}
