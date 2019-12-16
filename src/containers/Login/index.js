import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Layout, message } from 'antd';
import LoginForm from '../../components/Forms/LoginForm'
import useForm from '../../util/hooks/useForm';
import { auth } from '../../store/actions/auth';
import gwxBountyLogo from '../../assets/img/gwx-bounty-logo.svg';

const Login = ({
  onAuth,
  loading,
  token,
  history,
  location,
  loginError
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

    if (loginError) {
      message.config({ maxCount: 1 })
      message.error(loginError)
    }
  }, [history, loginError, token])
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

  if (location.state) {
    if (location.state.message) {
      if (location.state.type === 'Success') {
        message.success(location.state.message)
      } else {
        message.error(location.state.message)
      }
      location.state.message = ''
    }
  }

  return (
    <Layout style={{ height: '100vh', backgroundColor: '#465983' }}>
      <Row type="flex" justify="center" align="middle" style={{ height: '10vh', marginTop: '20vh' }}>
        <Col>
          <img src={gwxBountyLogo} alt="GWX Bounty" />
        </Col>
      </Row>

      <Row type="flex" justify="center" align="middle">
        <Col xs={20} sm={16} md={12} lg={8} xl={5}>
          {loginForm}
        </Col>
      </Row>
    </Layout>
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
    onAuth: (userData) => dispatch(auth(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);