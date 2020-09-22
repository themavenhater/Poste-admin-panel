import axios from 'axios';

export const GET_ARTICLES = '[ARTICLES APP] GET ARTICLES';
export const GET_TAGS = '[ARTICLES APP] GET TAGS';
export const SET_SEARCH_TEXT = '[ARTICLES APP] SET SEARCH TEXT';

export function getArticles() {
  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/articles');
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_ARTICLES,
        payload: response.data,
      })
    );
}

export function getTags() {
  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/tags/minified');
  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_TAGS,
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
