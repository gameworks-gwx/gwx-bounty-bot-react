import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Container } from 'semantic-ui-react';
import LoginForm from '../../components/Auth/LoginForm'
import Error from '../../components/UI/Error';
import useForm from '../../util/hooks/useForm';
import validate from '../../util/LoginValidation';
import * as actions from '../../store/actions/auth';

const Login = ({
  onAuth,
  loading,
  loginError,
  token,
  history
}) => {

  const [errors, setErrors] = useState([]);

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
    <Container style={{ marginTop: '10em' }}>
      <Grid>
        <Grid.Row columns="equal" only="mobile">
          <Grid.Column>
            {
              loginError ? <Error message={loginError} /> : ''
            }
            <Segment>
              Log In
              {loginForm}
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns="3" only="tablet computer">
          <Grid.Column>
            {
              loginError ? <Error message={loginError} /> : ''
            }
            <Segment>
              Log In
              {loginForm}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
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