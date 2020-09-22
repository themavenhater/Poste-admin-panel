import axios from 'axios';

export const GET_DOCUMENTS = '[POST APP] GET DOCUMENTS';
export const SET_TYPES_SEARCH_TEXT = '[POST APP] SET TYPES SEARCH TEXT';

export function getDocuments() {

  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/documents/');

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_DOCUMENTS,
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

