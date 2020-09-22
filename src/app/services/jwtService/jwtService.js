import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';
import jwtDecode from 'jwt-decode';

class jwtService extends FuseUtils.EventEmitter {

  init() {
    //this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(response => {
      return response;
    }, err => {
      return new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized response, logout the user
          this.emit('onAutoLogout', 'Invalid access_token');
          this.setSession(null);
        }
        throw err;
      });
    });
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();
    if (!access_token) {
      console.log('no access token :(')
      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data)
        .then(response => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios.post(process.env.REACT_APP_BACKEND_URL + '/auth/local', {
        identifier: email,
        password: password
      }).then(response => {
          // Handle success
          const role = response.data.user.role.type
          const token = response.data.jwt;
          this.setSession(token)
          this.isAuthTokenValid(token)
          this.setRole(role)
          resolve({role: role});
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const token = this.getAccessToken();
      const role = this.getRole()
      if (this.isAuthTokenValid(token) && role.length > 0) {
        this.setSession(token);
        resolve({role: role});
      } else {
        reject()
      }
    });
  };

  updateUserData = (user) => {
    return axios.post('/api/auth/user/update', {
      user: user
    });
  };

  setSession = access_token => {
    if (access_token) {
      localStorage.setItem('Authorization', access_token);
      axios.defaults.headers.common["Authorization"] = 'Bearer ' + access_token;
    } else {
      localStorage.removeItem('Authorization');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  setRole = role => {
    if (role) {
      localStorage.setItem('jwt_role', role);
    } else {
      localStorage.removeItem('jwt_role');
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = access_token => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    /*console.log("current ", currentTime)
    console.log("decoded ", decoded)*/
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    } else {
      return true;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem('Authorization');
  };

  getRole = () => {
    return window.localStorage.getItem('jwt_role');
  };
}

const instance = new jwtService();

export default instance;
