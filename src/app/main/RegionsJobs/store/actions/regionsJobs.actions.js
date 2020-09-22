import axios from 'axios';

export const GET_REGIONS = '[POST APP] GET REGIONS';
export const GET_JOBS = '[POST APP] GET JOBS';
export const SET_TYPES_SEARCH_TEXT = '[POST APP] SET TYPES SEARCH TEXT';

export function getRegions() {

  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/regions/');

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_REGIONS,
        payload: response.data
      })
    );
}

export function getJobs() {

  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/functions/');

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_JOBS,
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

