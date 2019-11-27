import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

const Logout = ({ onAuthLogout, location }) => {

  let message;
  let type;

  if (location.state) {
    message = location.state.message
    type = location.state.type
  } else {
    message = "You have successfully logged out"
    type = "Success"
  }
  useEffect(() => {
    onAuthLogout();
  }, [onAuthLogout])

  return (
    <Redirect to={{
      pathname: '/login',
      state: {
        message,
        type
      }
    }} />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogout: () => dispatch(actions.authLogout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);