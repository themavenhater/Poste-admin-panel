import axios from 'axios';

export const GET_SERVICES = '[POST APP] GET SERVICES';
export const SET_SERVICES_SEARCH_TEXT = '[POST APP] SET SERVICES SEARCH TEXT';

export function getServices() {

  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/services');

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_SERVICES,
        payload: response.data
      })
    );
}

export function setServicesSearchText(event) {
  return {
    type: SET_SERVICES_SEARCH_TEXT,
    searchText: event.target.value
  }
}

