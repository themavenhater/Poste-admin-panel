import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'app/store/actions';
import jwtService from '../../app/services/jwtService';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.jwtCheck();
  }

  jwtCheck = () => {
    jwtService.on('onAutoLogin', () => {
      this.props.showMessage({
        message: 'Vous êtes connecté',
        autoHideDuration: 6000,//ms
        variant: 'success'
      });
      /**
       * Sign in and retrieve user data from Api
       */
      jwtService.signInWithToken()
        .then(user => {
          this.props.setUserData(user);
          this.props.showMessage({
            message: 'Vous êtes connecté',
            autoHideDuration: 6000,//ms
            variant: 'success'
          });
        })
        .catch(error => {
          this.props.showMessage({
            message: 'Erreur de connexion',
            autoHideDuration: 6000,//ms
            variant: 'error'
          });
          console.log(error)
        })
    });

    jwtService.on('onAutoLogout', (message) => {
      this.props.showMessage({
        message: 'Vous avez déconnecté',
        autoHideDuration: 6000,//ms
        variant: 'info'
      });
      this.props.logout();
    });

    jwtService.init();
  };

  render() {
    const {children} = this.props;
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage
    },
    dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
