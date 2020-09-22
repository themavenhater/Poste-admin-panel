import axios from 'axios';

export const GET_NOTIFICATIONS = '[NOTIFICATIONS APP] GET NOTIFICATIONS';
export const SET_SEARCH_TEXT = '[NOTIFICATIONS APP] SET SEARCH TEXT';

export function getNotifications() {
  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/notifications');
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_NOTIFICATIONS,
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
