import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'antd';
import LoginForm from '../../components/Forms/LoginForm'
import useForm from '../../util/hooks/useForm';
import * as actions from '../../store/actions/auth';

const Login = ({
  onAuth,
  loading,
  token,
  history,
  location
}) => {


  useEffect(() => {
    if (token) {
      history.push({
        pathname: '/',
        state: {
          pageTitle: 'Home'
        }
      });
    }
  })
  const defaultValues = {
    email: '',
    password: '',
  }

  const submitForm = () => {
    onAuth(values)
  }

  const { values, handleChange, handleSubmit } = useForm(submitForm, defaultValues)

  const loginForm =
    <LoginForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      values={values}
      loading={loading}
    />

  let alertDialog;
  if (location.state) {
    if (location.state.message) {
      alertDialog =
        <Alert
          message={location.state.message}
          type={location.state.type ? "error" : "success"}
          showIcon
          closable
        />
    }
  }

  return (
    <Row type="flex" justify="center" align="middle" style={{ height: '40rem' }}>
      <Col xs={20} sm={16} md={12} lg={8} xl={5}>
        {location.state
          ? alertDialog
          : ''
        }
        {loginForm}
      </Col>
    </Row>
  )
}
const mapStateToProps = ({ auth }) => {
  return {
    loading: auth.loading,
    loginError: auth.error,
    token: auth.token,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (userData) => dispatch(actions.auth(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);