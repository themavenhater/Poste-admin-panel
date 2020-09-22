import history from '@history';
import {setDefaultSettings, setInitialSettings} from 'app/store/actions/fuse';
import firebaseService from 'app/services/firebaseService';
import auth0Service from 'app/services/auth0Service';
import jwtService from 'app/services/jwtService';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

/**
 * Set User Data
 */
export function setUserData(user) {
  return (dispatch) => {

    /*
    Set User Settings
     */
    dispatch(setDefaultSettings({}));

    /*
    Set User Data
     */
    dispatch({
      type: SET_USER_DATA,
      payload: user
    })
  }
}

/**
 * Update User Shortcuts
 */


/**
 * Remove User Data
 */
export function removeUserData() {
  return {
    type: REMOVE_USER_DATA
  }
}

/**
 * Logout
 */
export function logoutUser() {

  return (dispatch, getState) => {

    const user = getState().auth.user;

    if (!user.role || user.role.length === 0)// is guest
    {
      return null;
    }

    history.push({
      pathname: '/'
    });

    switch (user.from) {
      case 'firebase': {
        firebaseService.signOut();
        break;
      }
      case 'auth0': {
        auth0Service.logout();
        break;
      }
      default: {
        jwtService.logout();
      }
    }

    dispatch(setInitialSettings());
    dispatch({
      type: USER_LOGGED_OUT
    })
  }
}
