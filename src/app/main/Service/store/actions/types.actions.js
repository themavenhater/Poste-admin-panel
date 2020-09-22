import axios from 'axios';

export const GET_TYPES = '[POST APP] GET TYPES';
export const SET_TYPES_SEARCH_TEXT = '[POST APP] SET TYPES SEARCH TEXT';

export function getTypes() {

  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/service-types/');

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_TYPES,
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

