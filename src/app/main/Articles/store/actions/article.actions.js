import axios from 'axios';

export const GET_CLIENT_PROFILE = '[CLIENTS APP] GET CLIENT PROFILE';

export function getClientProfile(params) {
    const request = axios.get("https://aiedoc.herokuapp.com/api/clients/" + params);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_CLIENT_PROFILE,
                payload: response.data
            })
        );
}