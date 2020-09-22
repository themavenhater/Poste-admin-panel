import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {getServices} from "./services.actions";

export const GET_SERVICE = '[POSTE APP] GET SERVICE';
export const SAVE_SERVICE = '[POSTE APP] SAVE SERVICE';

export function getService(serviceId) {
  const request = axios.get(process.env.REACT_APP_BACKEND_URL + '/services/' + serviceId);
  return (dispatch) => {
    request.then((response) =>
      dispatch({
        type: GET_SERVICE,
        payload: response.data
      })
    )
  };

}

export function addService(data, props) {
  console.log("data : ",...data)
  const request = axios.post(process.env.REACT_APP_BACKEND_URL + '/services', data);
  return (dispatch) =>
    request.then((response) => {
        dispatch(showMessage({
          message: 'Service ajouté',
          autoHideDuration: 3000,//ms
          variant: 'success'
        }));
        props.history.push("/services-types/services/");
        return dispatch({
          type: SAVE_SERVICE,
          payload: response.data
        });
      }
    ).catch(err => console.log(err))
    ;
}

export function saveService(data, id) {
  const request = axios.put(process.env.REACT_APP_BACKEND_URL + '/services/' + id, data);
  return (dispatch) =>
    request.then((response) => {
        dispatch(showMessage({
          message: 'Service modifié',
          autoHideDuration: 3000,//ms
          variant: 'success'
        }));
        dispatch(getServices());
        // return navigation("/services-types/services/")
      }
    );
}

export function saveImages(id, images, props) {
  console.log('images', typeof images);
  const request = axios.post(process.env.REACT_APP_BACKEND_URL + '/services/' + id + '/images', images);
  return (dispatch) =>
    request.then((response) => {
        console.log(response);
        dispatch(showMessage({
          message: 'Image ajouté',
          autoHideDuration: 3000,//ms
          variant: 'success'
        }));
        dispatch({
          type: SAVE_SERVICE,
          payload: response.data
        })
      }
    );
}

export function deleteService(params, navigation) {
  const request = axios.delete(process.env.REACT_APP_BACKEND_URL + '/services/' + params);
  return (dispatch) =>
    request.then((response) => {
        dispatch(showMessage({
          message: 'Service supprimé',
          autoHideDuration: 3000,//ms
          variant: 'error'
        }));
        dispatch(getServices());
        return navigation("/services-types/services/")
      }
    );
}

export function deleteImage(params, navigation) {
  const request = axios.delete(process.env.REACT_APP_BACKEND_URL + '/services/' + params.product + '/images/',
    {
      data: {
        links: [params.url]
      }
    });
  return (dispatch) =>
    request.then((response) => {
        dispatch(showMessage({
          message: 'image supprimée',
          autoHideDuration: 3000,//ms
          variant: 'error'
        }));
        return dispatch({
          type: GET_SERVICE,
          payload: response.data
        })
        // navigation("/services-types/services/"+params.service)
      }
    );
}


export function newService() {
  const data = {
    name: '',
    description: '',
    service_type: '',
    // faq: [],
    procedures: [],
    image: '',
    tempImage: '',
    // active: true,
  };

  return {
    type: GET_SERVICE,
    payload: data
  }
}
