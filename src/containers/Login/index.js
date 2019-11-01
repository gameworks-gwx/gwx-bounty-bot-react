import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import LoginForm from '../../components/Auth/LoginForm'
import Alert from '../../components/UI/Alert';
import useForm from '../../util/hooks/useForm';
import validate from '../../util/LoginValidation';
import * as actions from '../../store/actions/auth';

const Login = ({
  onAuth,
  loading,
  loginError,
  token,
  history,
  location
}) => {

  const [errors, setErrors] = useState([]);

  //console.log(loginError);

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  })
  const defaultValues = {
    email: '',
    password: '',
  }

  const submitForm = () => {
    const errorValidate = validate(values);
    if (Object.keys(errorValidate).length) {
      setErrors(errorValidate);
    } else {
      setErrors([]);
      onAuth(values)
    }
  }

  const { values, handleChange, handleSubmit } = useForm(submitForm, defaultValues)

  const loginForm =
    <LoginForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      values={values}
      loading={loading}
      errors={errors}
    />

  return (
    <Row type="flex" justify="center" align="middle" style={{ height: '40rem' }}>
      <Col xs={20} sm={16} md={12} lg={8} xl={5}>
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