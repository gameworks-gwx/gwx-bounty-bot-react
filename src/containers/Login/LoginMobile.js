import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import LoginForm from '../../components/Auth/LoginForm';

const LoginMobile = () => {
  return (
    <Grid.Row columns="equal" only="mobile">
      <Grid.Column>
        <Segment>
          Log In
          <LoginForm />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  )

}

export default LoginMobile;