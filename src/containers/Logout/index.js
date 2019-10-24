import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

const Logout = ({ onAuthLogout }) => {

  useEffect(() => {
    onAuthLogout();
  }, [onAuthLogout])

  return (
    <Redirect to={{
      pathname: '/login',
      state: {
        message: 'You have been successfully logged out'
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